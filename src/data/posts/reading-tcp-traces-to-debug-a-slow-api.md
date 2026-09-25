---
title: "Reading TCP traces to debug a 'slow' API"
category: "Networking"
date: "2026-06-18"
readingTime: "7 min"
excerpt: "The endpoint wasn't slow — the connection was. Notes on how a packet capture turned a vague latency complaint into a two-line fix."
cover: /images/hack-room-artwork.webp
coverAlt: "A desk with a laptop mid-debug, terminal windows open"
---

A service owner filed the ticket every backend engineer dreads: *"the API feels slow, no pattern we can find."* Graphs looked flat. p95 was fine. p99 was fine. And yet, three or four times an hour, a request that should take 40 ms took four seconds.

This is the story of how a packet capture turned that vague complaint into a two-line fix — and the checklist I now use before touching any "slow" ticket.

## Step 0: distrust the averages

Percentiles computed over a minute of traffic can hide a 4-second stall inside a p99 that still rounds to 80 ms. The first thing I did was bucket by *connection*, not by request:

```bash
# How many requests per connection are we making?
$ tcpdump -i any -w capture.pcap port 443 and host api.internal

# In Wireshark: Statistics → Conversations → TCP tab, sort by duration
```

The answer was damning: 1 request per connection. Every API call paid the full handshake toll, and the "slow" outliers were the calls that drew the short straw on packet loss.

## The three taxes hidden in every new connection

A fresh TCP + TLS connection to a far-away server pays:

1. **TCP handshake** — 1 round trip before any data moves.
2. **TLS handshake** — 1–2 more round trips (more with TLS 1.2).
3. **TCP slow start** — the congestion window starts small, so early data trickles.

If the server is 30 ms away, that's roughly 3 RTTs before request bytes are even sent:

$$
t_{first\ byte} \approx 3 \cdot RTT + t_{server}
$$

$$
t_{first\ byte} \approx 3 \times 30\,\text{ms} + 40\,\text{ms} = 130\,\text{ms best case}
$$

130 ms best case — and 4 seconds when a handshake SYN or TLS ClientHello is lost and TCP retries on an exponential timer. The smoking gun in the capture: `SYN → no reply → SYN (retransmit, 1 s backoff) → SYN-ACK`. There's the 4-second outlier, explained in one screenshot of a time sequence.

![The debugging setup: capture on the client, correlate with server logs by timestamp](/images/GitGame.webp)
*Fig. 1 — Correlating client-side captures with server logs was how we confirmed the retransmits, not the server, were the stall.*

## The two-line fix

Connection setup per request was the disease, so the fix was to keep connections alive:

```nginx
# nginx upstream config — before
upstream api { server api.internal:443; }

# after — reuse and cap keepalive connections
upstream api {
    server api.internal:443;
    keepalive 32;
    keepalive_requests 1000;
}
```

Two lines of config. p99.9 dropped from ~4 s to ~180 ms. The endpoint never was slow — the *connection churn* was.

## The checklist I keep for "slow" tickets

- [ ] Bucket latencies **per connection**, not just per request
- [ ] Check connection reuse (keepalive) before profiling any handler
- [ ] Capture packets *on both ends* — one capture lies about who dropped what
- [ ] Look for retransmissions first; they explain most "random" seconds-long stalls
- [ ] Remember the math: retries multiply, they don't add — one lost SYN is a 1-second stall

> The takeaway generalizes: when a system "sometimes feels slow," measure the *setup*, not just the work. Most performance mysteries I've hit since have been rent paid repeatedly, not the job itself being expensive.

---

### Appendix: the backoff math

TCP retransmits follow exponential backoff. If the first SYN is lost, the retransmit times are $t_0, 2t_0, 4t_0, \dots$ — cumulative stall after $n$ losses:

$$
T_n = t_0 \sum_{i=0}^{n-1} 2^i = t_0 (2^n - 1)
$$

With Linux's default $t_0 = 1\,\text{s}$: a single lost SYN costs 1 s, two consecutive losses cost 3 s. That's why the outliers clustered at suspiciously exact numbers — 1.0 s, 3.0 s, 7.0 s. Measured p99.9 of 4.0 s? A lost SYN *plus* one lost retransmit segment. The math doesn't just explain the bug; it names it.
