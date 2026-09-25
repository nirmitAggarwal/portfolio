---
title: "Why I'm learning systems programming in public"
category: "Learning"
date: "2026-05-30"
readingTime: "4 min"
excerpt: "Building in the open keeps me honest. What I'm working on, what I don't understand yet, and why incomplete notes beat perfect silence."
---

There's a version of this portfolio where I wait until everything is polished, then reveal it all at once, perfectly curated. This is not that version. Everything on this page — the build log with its "coming soon" slots, the articles written one compile error at a time — is a bet that learning in public beats learning in silence.

This post is the rationale, so future-me can re-read it on the days the bet feels wrong.

## The problem with private learning

Learning in private has a failure mode that looks a lot like success: you keep consuming. A tutorial, then another. A book, then another. Understanding *feels* like it's accumulating because you keep nodding along.

The test I was failing silently: **can I rebuild it from an empty file?** Watching someone implement Raft and implementing Raft are separated by a chasm, and private learning lets you ignore the chasm indefinitely.

## What "in public" actually means

Not "build an audience." Nothing so grand. It's three small habits:

1. **Notes are draft-forever.** I publish what I understand *this week*, with the gaps visible. The "what I don't understand yet" sections are not humility theater — they're a queue of future work.
2. **Every project ships a post-mortem**, win or lose. Especially lose. The BOINC clone post took an hour to write and reorganized my understanding of lease expiry more than the week of coding did.
3. **Questions go somewhere durable.** Not lost in a chat scroll. If I can't explain *why* something works, that's a blog post in draft status.

The compounding is the point. A note written in public is searchable by future-me, useful to a stranger today, and — this part surprised me — corrected by strangers within days. I once published a claim about TCP backoff that a reader fixed in an email within 48 hours. That correction cost me a little embarrassment and saved future-me a subtle bug.

## What I don't understand yet

Current queue, published on purpose:

- [x] Why leases beat heartbeats for flaky volunteers
- [x] Ownership transfer through channels vs shared state
- [ ] TCP congestion control beyond slow start (CUBIC, BBR — reading now)
- [ ] io_uring — I've read the man pages, I haven't *felt* the problem it solves
- [ ] Consensus: I can implement Raft's log replication, elections still feel like folklore

That list is the most honest piece of writing on this site.

## The math of small consistent output

The reason this strategy works is arithmetic, not motivation. Say writing one post deepens a topic by some factor $r$ over just consuming it, and I write $n$ posts per month. Compounding across topics that share concepts:

$$
\underbrace{(1 + r)^n}_{\text{compounding}} \gg \underbrace{1 + nr}_{\text{one big push}}
$$

Six posts with $r = 0.2$ each beats one herculean write-up with $6r$ — because the sixth post borrows from the first five, and systems concepts transfer: leases taught me Raft elections taught me backoff timers. Small and connected compounds; big and isolated doesn't.

> The rule I hold: publish at the edge of understanding, one step past comfort, never two. One step is growth. Two is noise.

If you're reading this and waiting to feel "ready" before putting your work where people can see it: the readiness comes *from* the publishing, not before it.
