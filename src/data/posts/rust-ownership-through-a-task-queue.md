---
title: "Rust ownership, explained through a task queue"
category: "Rust"
date: "2026-07-02"
readingTime: "8 min"
excerpt: "The borrow checker finally clicked for me when I stopped fighting it and started designing ownership into a work-queue's API. A walkthrough of the reasoning, one compile error at a time."
cover: /images/3-phases-of-building-artwork.webp
coverAlt: "Artwork showing the three phases of building something"
---

Every Rust tutorial shows you ownership with strings and vectors. That never made it click for me. What made it click was building something with an opinion about *who is responsible for a piece of work at each instant* — a task queue.

This post walks through that queue, one borrow-checker error at a time.

## The naive design

A work queue: producers push tasks, workers pull tasks. Coming from garbage-collected languages, I wrote what felt natural — a shared queue behind a mutex:

```rust
use std::collections::VecDeque;
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let queue = Arc::new(Mutex::new(VecDeque::<String>::new()));

    let q = Arc::clone(&queue);
    let producer = thread::spawn(move || {
        for i in 0..4 {
            q.lock().unwrap().push_back(format!("task-{i}"));
        }
    });

    let consumer = thread::spawn({
        let q = Arc::clone(&queue);
        move || {
            while let Some(task) = q.lock().unwrap().pop_front() {
                process(task);
            }
        }
    });

    producer.join().unwrap();
    consumer.join().unwrap();
}

fn process(task: String) {
    println!("processing {task}");
}
```

This compiles. It even works. So why did I call it naive? Because ownership isn't doing any work here — `Arc<Mutex<…>>` is "I give up, everyone share everything." The compiler can't tell me *who* owns a task between `push_back` and `pop_front`, because the answer is "the lock, sort of, whoever's holding it."

Then I found `std::sync::mpsc`, and the design flipped.

## Ownership as the API

A channel is an ownership-transfer machine. `send()` *moves* the value into the channel; `recv()` *moves* it out. Exactly one thread holds a task at every instant — and the compiler enforces it:

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel::<String>();

    // Producer: each task is MOVED into the channel. Gone from this thread.
    thread::spawn(move || {
        for i in 0..4 {
            let task = format!("task-{i}");
            tx.send(task).unwrap();
            // println!("{task}"); // ← error[E0382]: borrow of moved value: `task`
        }
    });

    // Consumer: each task is MOVED out. Exactly one worker owns it now.
    for task in rx {
        thread::spawn(move || {
            process(task); // task moved into the worker — no clone, no lock
        });
    }
}

fn process(task: String) {
    println!("processing {task}");
}
```

That commented-out line is the lesson. Uncomment it and you get:

```text
error[E0382]: borrow of moved value: `task`
  --> src/main.rs:11:27
   |
9  |             let task = format!("task-{i}");
   |                 ---- move occurs because `task` has type `String`
10 |             tx.send(task).unwrap();
   |                     ---- value moved here
11 |             println!("{task}");
   |                       ^^^^^ value borrowed here after move
```

The compiler isn't being pedantic. It's answering the exact question a distributed queue leaves ambiguous: *who is responsible for this task right now?* In the channel version the answer is a invariant, provable at compile time: **exactly one thread, always.**

## When a worker needs to hold two things

The first real fight came when a worker needed the task *and* a handle to shared metrics. I tried to stuff both into the closure and got the classic triple-borrow error:

```rust
let metrics = Arc::new(Mutex::new(Metrics::default()));

for task in rx {
    thread::spawn(move || {
        process(&task);
        metrics.lock().unwrap().record(&task); // fine — Arc is cloned in
    });
}
```

This works because `Arc` clones *the handle*, not the data — ownership of the metrics is shared by agreement, ownership of the task is transferred by value. Two different ownership models, both visible in the types. Once I could read that distinction in a signature, closures stopped being a guessing game.

## Sizing the queue with math

One question kept coming up: how big should the backlog be allowed to get? Little's law gives a surprisingly good intuition:

$$
L = \lambda W
$$

The steady-state number of tasks in the system $L$ equals the arrival rate $\lambda$ times the average time a task spends in the system $W$. If producers submit 50 tasks/sec and a worker takes 100 ms per task with 4 workers:

$$
L = 50 \times 0.1 = 5 \text{ tasks in flight, on average}
$$

So a bounded channel with capacity 32 gives roughly 6× headroom over steady state before producers block — enough to absorb bursts, small enough that a stalled consumer backs up the producer visibly instead of silently.

## The takeaway

I stopped reading ownership as a set of restrictions and started reading it as *documentation the compiler checks*:

| Ownership tool | What it says in plain English |
| --- | --- |
| `move` | "This value's responsibility now belongs to you." |
| `&T` | "You may look, but the owner stays responsible." |
| `&mut T` | "You're responsible *for now*, exclusively." |
| `Arc<T>` | "We share responsibility by agreement, immutably." |
| `Arc<Mutex<T>>` | "We share responsibility by agreement, one at a time." |
| `mpsc::Sender` | "I hand responsibility off and wash my hands of it." |

The borrow checker never once blocked me from writing the queue I actually wanted. It kept flagging the versions where the *responsibility story* was vague. That reframing — from fight to collaboration — is the whole game.
