---
title: "When both sides called WebRTC at once"
date: "2026-08-12"
tags:
  - webrtc
  - web
  - javascript
  - react
excerpt: "WebRTC needs two peers to negotiate a connection, but when both sides tried to become the caller at once, my watch party app got stuck in the middle."
---

[CrushedPlay_](https://github.com/NabarunKar/CrushedPlay) is a watch-party app for local movie files. The interesting part is that the movie does not have to be uploaded to a server: when only the Host has the file, the browser transfers it directly to the Guest over WebRTC.

The connection setup is handled through a small WebSocket signaling server. The browsers exchange SDP offers, answers, and ICE candidates there, then the actual movie transfer happens peer-to-peer.

It worked.

Until I tried to connect two browsers that both thought they should be in charge.

## The connection that never got started

WebRTC's connection setup is a negotiation.

One peer creates an **SDP Offer**, sends it to the other peer, and the other peer creates an **SDP Answer**.

So the mental model is basically:

```text
Host
  |
  | SDP Offer
  v
Guest
  |
  | SDP Answer
  v
Host
```

That sounds straightforward.

My first implementation made a subtle assumption: either side could start the negotiation.

Which meant that sometimes the two browsers did this:

```text
Host  ---------------- SDP Offer ----------------> Guest
      <--------------- SDP Offer -----------------
```

Both peers had decided to be the caller.

Their offers crossed paths through the signaling server, and instead of one side cleanly answering the other, the negotiation ended up in a race condition. The connection deadlocked, and the Guest never received the movie.

There was no dramatic error message telling me "you have two callers."

The symptom was much simpler:

**the movie just never arrived.**

## Why this was a race condition

The tricky part was that the individual pieces were all working.

- The WebSocket server was working.
- The browsers could exchange signaling messages.
- The WebRTC APIs were working.
- The problem was the **order** in which both peers acted.
- The Host could create an Offer because it was ready.
- The Guest could also create an Offer because it was ready.

If those actions happened independently at roughly the same time, both sides entered the same state:

> "I am the caller."

The signaling server dutifully relayed both Offers, but it was not responsible for deciding which browser should be the caller. It was just the messenger.

So I had built a signaling path that was correct at the message level but ambiguous at the role level.

That ambiguity was the bug.

## The fix

The solution was surprisingly simple:

**Stop letting both peers negotiate symmetrically.**

CrushedPlay_ already has a concept of a Host and a Guest, so I used it.

The Host is now always the **Caller**.

The Guest is always the **Answerer**.

```text
Host
  |
  | Create DataChannel
  | Create SDP Offer
  |-------------------->
  |                     Guest
  |                  Create Answer
  |<--------------------|
```

The Host is the only side that calls the code that creates the DataChannel and starts the SDP Offer.

The Guest waits for the Offer, sets it as the remote description, creates an Answer, and sends that back.

That removes the race completely.

There is no longer a question of:

> "Who starts?"

The architecture has already answered it.

## Why the signaling server didn't need to solve it

One of the useful lessons from this bug was realizing that the signaling server did not need to become smarter.

Its job is to carry the negotiation messages between peers:

```text
Browser A
   |
   | WebSocket
   v
Signaling Server
   |
   | WebSocket
   v
Browser B
```

It does not need to understand WebRTC deeply enough to decide who should call whom.

That decision belongs to the application layer.

CrushedPlay_ already knew that one participant was the Host and the other was the Guest, so the cleanest fix was to make that existing distinction determine the WebRTC roles.

## The takeaway

This was one of those bugs where everything looked independently correct.

The signaling server worked. The WebRTC API worked. The movie transfer worked.

The failure came from the fact that **two perfectly valid actions could happen at the same time, and the system had no rule for which one should win.**

The fix was not another timeout, another retry, or more complicated signaling logic. It was a role.

Once the Host became the sole Caller and the Guest became the Answerer, the offer collision disappeared.

The rule I keep coming back to: when two peers can perform the same state transition, ask whether they actually should. Sometimes the cleanest way to eliminate a race condition is not to make the race safer, it is to make the competing action impossible.
