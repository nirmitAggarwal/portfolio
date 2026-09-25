---
title: "What building a BOINC clone taught me about failure"
category: "Projects"
date: "2026-08-14"
readingTime: "6 min"
excerpt: "Volunteer nodes vanish mid-task. Networks partition. Disks fill. Designing a distributed system for machines you don't control means designing for failure first — here's what that looked like in practice."
cover: /images/volunteer-cloud-artwork.png
coverAlt: "Artwork of a volunteer cloud — many small machines contributing to one computation"
---

Volunteer computing looks simple on a whiteboard: people donate idle CPU cycles, you hand out work, science happens. BOINC has been running this model for decades. I decided to build a miniature clone — a scheduler, a work store, and a swarm of volunteer clients — and it taught me more about distributed systems in six weekends than any lecture ever did.

The single biggest lesson: **failure is not an edge case, it is the steady state.**

## The machines you don't control

In a datacenter you own the fleet. You patch it, you monitor it, you can assume a node that was healthy five minutes ago is probably still healthy. Volunteer nodes are the opposite. Laptops close. Wi-Fi hops networks. Someone starts a video game and your worker is starved of CPU instantly.

So the first design decision had to be: *every task can disappear at any moment, and that must be fine.*

I encoded that assumption directly into the task state machine:

```python
# Task lifecycle — every transition assumes the previous holder may be gone
STATES = {"PENDING", "LEASED", "DONE", "ABANDONED"}

def lease_task(task, worker):
    task.state = "LEASED"
    task.lease_expires_at = now() + LEASE_SECONDS
    task.assigned_to = worker.id

def reclaim_expired(task):
    # The volunteer never reported back. Don't panic, don't alert, just requeue.
    if task.state == "LEASED" and now() > task.lease_expires_at:
        task.state = "PENDING"
        task.assigned_to = None
```

That `reclaim_expired` loop is the heart of the system. No alarms, no human intervention — a vanished volunteer is as ordinary as rain.

## The math of replicas

With unreliable workers, you can't send a task to exactly one machine. I replicate every task to $k$ volunteers and accept the first result. If a single volunteer has an independent daily failure probability $p$, the probability that *all* $k$ replicas die within the lease window is:

$$
P(\text{task lost}) = p^k
$$

With $p = 0.2$ (a pessimistic number for laptops closing) and $k = 3$:

$$
P(\text{task lost}) = 0.2^3 = 0.008
$$

That is a 120× improvement over a single replica — but replication alone lies to you, because volunteer failures are **not** independent. Laptops close in the evening *together*. Hostel Wi-Fi reboots *together*. So the effective $p$ is correlated, and the formula above is a floor, not a guarantee. The fix was boring and effective: stagger lease expiries randomly across a window instead of batching them.

![Inside the build: the "lab" where most of the scheduler was written](/images/hack-room-artwork.webp)
*Fig. 1 — Where the lease expiries were tuned at 2 a.m. The whiteboard said "correlated failures" for three weeks.*

## Checkpoints are a love language

Long tasks that restart from zero waste donated cycles, and wasted cycles mean volunteers churn away. So workers checkpoint their progress:

```rust
/// Persist partial progress so a restarted worker resumes, not restarts.
pub fn checkpoint(&self, state: &TaskState) -> io::Result<()> {
    let bytes = bincode::serialize(state)?;
    // Write-then-rename: a crash mid-write never corrupts the old checkpoint.
    let tmp = self.path.with_extension("tmp");
    fs::write(&tmp, bytes)?;
    fs::rename(&tmp, &self.path)?;
    Ok(())
}
```

That `write-then-rename` dance is small, but it encodes a whole philosophy: *the system must survive its own recovery mechanisms failing.*

## Results and what I'd do differently

Final numbers from a 12-node test swarm over two weeks:

| Failure mode | Without handling | With handling |
| --- | --- | --- |
| Node vanishes mid-task | Task lost forever | Requeued in ≤ 90 s |
| Network partition (10 min) | Swarm stalls | Leases expire, work resumes |
| Duplicate results | Accepted twice | Deduplicated by result hash |
| Slow node (10× latency) | Tail latency 10× | Straggler outrun by replicas |

What I'd change:

- [x] Lease-based scheduling instead of heartbeats
- [x] Write-then-rename checkpoints
- [ ] Result verification by redundant execution on *unrelated* hosts (mine were too friendly)
- [ ] A real backpressure story — the work store happily queued tasks nobody could run

> The most valuable thing the project gave me wasn't the code. It was a reflex: whenever I design any component now, the first question I ask is "what happens when this thing just… stops?"

Volunteer nodes vanish. Networks partition. Disks fill. Build for it on day one.
