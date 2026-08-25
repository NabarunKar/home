---
title: "A browser inside a browser, and the boundary I couldn't cross"
date: "2026-03-18"
tags:
  - iframe
  - web
  - javascript
  - react
excerpt: "An iframe can show you a live site, but it won't let your fake browser drive it — the same-origin boundary decides what \"browser\" actually means."
---

My [3D portfolio is a desktop scene](https://nabarunkar.vercel.app/). Walk up to the monitor and it opens a little OS I call nabarunOS, a Windows 95-flavored desktop with shortcuts for My Showcase, Doom, Scrabble, and, of course, Internet Explorer. Clicking that shortcut opens a draggable, resizable window with a retro toolbar: Back, Forward, Refresh, Home, an address bar, and a Go button. The content area is an iframe pointed at my [live portfolio site](https://nabarunk.vercel.app/).

So the whole thing is a browser inside a browser inside a 3D scene, and the embedded site is itself a full website with its own navigation. The idea was the nostalgia of it: my site, rendered through a fake Internet Explorer.

## The iframe part works

The surprise is how much of this actually works. An iframe is not a screenshot or a mockup; it is a real browsing context. The site loads, scrolls, and stays fully interactive with its own JavaScript, its own layout, its own clicks. From a distance it genuinely looks like an old browser rendering the modern web.

## The toolbar has nothing to drive

The illusion breaks the moment you think about what a browser toolbar actually is. Back and Forward walk the page's history. Refresh reloads the current document. The address bar tells you where you are. A real toolbar is control, not decoration.

My toolbar controls nothing. The embedded site is cross-origin, and a cross-origin iframe is a sealed box: the parent page cannot reach into its document, cannot read where it has navigated, cannot touch its history. That is the same-origin boundary doing its job, but it means every button in my fake browser is trying to drive a page it has no handle on.

## What I built instead

The workaround was to move the browser's brain out of the iframe and into the parent component.

- **History.** Back and Forward do not use the iframe's history, it is invisible to me. The parent keeps its own stack of URLs the user has submitted, and the buttons step through that stack. Home just resets the stack to the original portfolio URL.
- **Address bar.** It shows what the user typed, not where the iframe actually is. If the embedded site navigates itself, a link clicked inside it, say the parent never hears about it, because nothing tells it where a cross-origin iframe has gone.
- **Refresh.** With no handle on the iframe's document, "reload" means tearing it down and building it again. The iframe is keyed by the URL plus a reload counter, so bumping the counter forces a remount.

The parent-side state ended up looking like this:

```tsx
const [history, setHistory] = useState<string[]>([HOME_URL]);
const [historyIndex, setHistoryIndex] = useState<number>(0);
const [reloadNonce, setReloadNonce] = useState<number>(0);
```

And the iframe itself:

```tsx
<iframe
  key={`${currentUrl}::${reloadNonce}`}
  src={currentUrl}
/>
```

## What you actually get

The result is browser-shaped, but it is not a browser. It navigates the URLs you feed it; it has no idea where the page really is. The history stack describes the user's journey through the address bar, not the iframe's journey through the web.

For a portfolio easter egg that is enough since nobody is doing serious research inside a fake Internet Explorer. But it is worth being precise about what got built: an iframe with a history widget bolted to the side, standing in for the one thing a real browser has that I could not fake: control over the page.

## The takeaway

Mocking up a browser UI is easy; the toolbar is just React. The hard part is that a toolbar is only meaningful if it can drive the page, and the platform deliberately does not let one page drive a cross-origin iframe. This was not a bug in my layout or a missing API, it is the same-origin boundary working exactly as designed.

The rule I keep coming back to: when a UI mockup implies control, ask which side of the origin boundary that control would have to live on. If it is the other side, the feature is fake until the architecture changes, and not until the styling is finished.

---
