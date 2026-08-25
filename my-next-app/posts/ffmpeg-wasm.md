---
title: "I put FFmpeg in the browser, and it actually worked"
date: "2026-05-07"
tags:
  - ffmpeg
  - wasm
  - javascript
  - web
  - react
excerpt: "I was used to thinking of FFmpeg as a command-line tool. Then I ran it inside a browser, and suddenly the server didn't need to touch the video at all."
---

I have used FFmpeg before, but always in the way you probably expect: a binary on a machine, a command in a terminal, and a video file going in and out the other side.

While building my Reddit video downloader, I ran into a slightly weird requirement. Reddit was giving me the video and audio as separate streams, and I wanted to turn them into one ordinary MP4. The obvious answer was FFmpeg.

The less obvious part was where to run it.

I did not want to upload the video to my server, wait for a serverless function to process it, and then download the finished file again. The browser already had the files. Why couldn't it just do the work itself?

That is where `ffmpeg.wasm` came in.

## FFmpeg, but inside a browser

`ffmpeg.wasm` is essentially FFmpeg compiled to WebAssembly so that it can execute inside a web application.

That distinction is the whole point.

Instead of this:

```text
Browser
   ↓
Upload video
   ↓
Server
   ↓
FFmpeg
   ↓
Finished MP4
   ↓
Browser
```

the architecture becomes:

```text
Browser
   ↓
Video + audio
   ↓
FFmpeg running in the browser
   ↓
Finished MP4
```

The server disappears from the media-processing path.

The thing that surprised me was how little the actual muxing command changes. The browser-side code is still essentially asking FFmpeg to do the familiar thing:

```bash
ffmpeg -i video.mp4 -i audio.mp4 -c copy output.mp4
```

The difference is that `video.mp4`, `audio.mp4`, and `output.mp4` live in FFmpeg's virtual filesystem inside the browser.

## The Reddit problem

The reason I ended up trying this was Reddit's video delivery.

For the post I was testing, Reddit exposed separate DASH representations for video and audio. The best video representation was a `720p` MP4 and the best audio representation was a separate audio MP4.

So the browser could download:

```text
video.mp4
audio.mp4
```

but neither file was the final thing I wanted.

I needed:

```text
video + audio → one MP4
```

That sounds like a tiny task. And it is, once you have FFmpeg.

The interesting part was getting FFmpeg itself to run in a browser reliably.

## What actually happens

The React application keeps the media entirely client-side.

After the app discovers the signed media URLs, it does roughly this:

```text
Reddit
  ↓
signed DASH manifest
  ↓
find highest-quality video
  ↓
find highest-quality audio
  ↓
fetch both as blobs
  ↓
write them into FFmpeg's filesystem
  ↓
run FFmpeg
  ↓
read output.mp4
  ↓
create a Blob
  ↓
trigger browser download
```

The browser is doing the processing, not just presenting the result.

That means the user's machine is the machine doing the expensive part.

## The part that felt weird

The FFmpeg API is not really "browser video editing" magic.

It is much closer to putting a small command-line environment inside the page.

The application writes files into a virtual filesystem:

```js
await ffmpeg.writeFile("video.mp4", videoData);
await ffmpeg.writeFile("audio.mp4", audioData);
```

Then it executes FFmpeg:

```js
await ffmpeg.exec([
  "-i", "video.mp4",
  "-i", "audio.mp4",
  "-c", "copy",
  "output.mp4",
]);
```

And finally reads the result back:

```js
const output = await ffmpeg.readFile("output.mp4");
```

That output becomes a normal browser `Blob` which can be downloaded.

So although the implementation feels very different from running `ffmpeg` in Terminal, the mental model is remarkably familiar:

> put files in → run the command → get a file out.

## `-c copy` matters

For this project, I did not want to re-encode the video.

Re-encoding would mean:

```text
video
  ↓
decode
  ↓
encode again
  ↓
new video
```

That costs much more CPU and can reduce quality.

Instead, I used stream copy:

```bash
-c copy
```

That tells FFmpeg to place the existing video and audio streams into the output container without re-encoding them.

For this use case, that is exactly what I wanted: **mux, don't transcode.**

## The server suddenly became boring

One of the nicest consequences is architectural.

The deployed website only needs to serve the JavaScript application.

It does not need to:

- store uploaded videos,
- run FFmpeg,
- keep temporary files,
- wait for server-side jobs,
- send a finished video back through the server.

The heavy media operation happens on the user's computer.

That has a funny scaling property:

```text
1 user   → 1 browser does the work
1,000 users → 1,000 browsers do the work
```

The server is mostly shipping application code.

Of course, that does not make the computation free. It just moves the CPU and memory cost to the machine that actually wants the video.

## The tradeoff

This is the part I think is more interesting than "FFmpeg works in WebAssembly."

The serverless architecture I originally considered was attractive because it would make the browser simpler:

```text
browser → server → FFmpeg → browser
```

But it creates a completely different set of constraints: server CPU time, temporary storage, bandwidth, function limits, and the problem of moving large media through infrastructure that doesn't really need to see it.

With `ffmpeg.wasm`, the tradeoff flips.

The infrastructure becomes simple.

The browser becomes responsible for the work.

That means a powerful laptop can chew through a file without my server knowing anything about it. A weak phone, on the other hand, has to do the same work with much less headroom.

There is no universal winner. The architecture depends on where you want the cost to live.

## The first attempt failed for a stupid reason

My first FFmpeg loading attempt did not fail because FFmpeg was too heavy.

It failed because I loaded the wrong asset.

I initially tried to load a remote `ffmpeg-core.worker.js` file from a CDN. The browser blocked that request because of CORS.

The actual fix was simpler: use the ESM core assets that matched the browser/Vite setup and let the `@ffmpeg/ffmpeg` worker handle the runtime.

That was a useful reminder because "CORS problem" is not a particularly helpful diagnosis by itself.

You still have to ask:

> Which request is blocked, from which origin, and why is that request necessary in the first place?

Removing the unnecessary request was a better fix than trying to fight the policy.

## What I like about it

The thing I like most about `ffmpeg.wasm` is not that it makes FFmpeg available in JavaScript.

It is that it changes where a piece of an application's architecture has to live.

A task I would normally think of as:

> "backend media processing"

can become:

> "client-side media processing"

without inventing a new media format or a custom processing engine.

You still have FFmpeg. You have just moved the machine running it.

And once that happened, a surprisingly large part of the backend disappeared.

## The bigger lesson

I think this was the first time I stopped thinking of WebAssembly as a technology for making browser demos fast and started thinking of it as a way to **move established native tooling into a different architectural boundary.**

The browser did not suddenly become a video server.

I just gave it a tool that used to live somewhere else.

And once that happened, a surprisingly large part of the backend disappeared.

---

*Footnote: the project ended up using a browser-side FFmpeg process specifically for muxing. The browser downloads the separate Reddit video and audio streams, copies those streams into FFmpeg's virtual filesystem, runs a stream-copy mux, and turns the resulting `output.mp4` into a downloadable Blob. The media never needs to pass through my server.*
