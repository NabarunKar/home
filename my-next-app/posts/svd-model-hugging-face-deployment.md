---
title: "Deploying an SVD model to Hugging Face"
date: "2026-08-24"
tags:
  - backend
  - machine-learning
  - deployment
  - docker
excerpt: "Your backend configuration can be perfectly correct, but if the reverse proxy strips your headers and Git LFS hides your weights, your model isn't going anywhere."
---

My movie recommendation project, [Filmoid](https://filmoid.vercel.app), uses a collaborative filtering algorithm to generate its results. Under the hood, it is a matrix factorization model built with `scikit-surprise` that requires mapping TMDB IDs to Letterboxd slugs, since the model was trained on data scraped from Letterboxd.

The problem? The serialized SVD model, located at [backend/models/svd_model.pkl](https://github.com/NabarunKar/filmoid/blob/master/backend/models/svd_model.pkl), sits at around 455 MB. Vercel's serverless functions choke on that kind of memory footprint, instantly throwing Out-Of-Memory exceptions.

To bypass this, I decoupled the architecture and spun up a custom `FastAPI` application, titled "Filmoid API", on Hugging Face Spaces. Their free tier offers a generous 16 GB of RAM, which is plenty for unrolling a heavy matrix into memory. But deploying a machine learning backend into a production container threw two massive curveballs I didn't see coming.

## The 134-byte fake model

The first issue was silent failure. The container booted successfully, the API responded with `200 OK`, but the system kept falling back to a blended TMDB heuristic instead of my custom algorithm.

I added custom memory probing using `psutil` (or standard `ps` as a fallback) to log the Resident Set Size (RSS) before and after the `surprise.dump.load` step. The logs showed the memory jumping from about 90 MiB to 117 MiB. That is 27 MiB. Not 455 MB.

When I added a file size check, the issue appeared:
`Model size (bytes): 134`

The backend was trying to unpickle a 134-byte file, throwing an `UnpicklingError: invalid load key, 'v'`. The 'v' was from `version https://git-lfs.github.com/spec/v1`. The code actually tried to fall back to `joblib.load`, but that crashed as well.

Because I had staged a clean deployment branch (`hf-deploy`) manually, I forgot to include `.gitattributes` in the push. Git Large File Storage (LFS) requires that file as a map. Without it, Hugging Face just accepted the tiny text pointer file as standard code, oblivious to the massive binary payload sitting in the LFS bucket.

The fix was simple: wipe the staging area, re-stage the backend directory alongside `.gitattributes`, and force push. The real 455 MB file hydrated, and the container's RSS memory correctly spiked to ~2.5 GiB.

## The proxy intercepts the preflight

With the model working, I wired up the Vite frontend on Vercel to hit the new Hugging Face endpoints. I explicitly configured FastAPI's `CORSMiddleware` with `allow_credentials=True` and passed my Vercel origin into the `allow_origins` array.

The browser blocked it immediately: `The value of the 'Access-Control-Allow-Credentials' header is ''`.

Testing with `curl` confirmed my backend code wasn't the problem. Hugging Face's Spaces infrastructure uses a reverse proxy at the edge that intercepts CORS `OPTIONS` preflight requests. It answers the browser directly, stripping out the credentials header for platform security reasons. My FastAPI application never even saw the `OPTIONS` request.

Even if I could force the header through, modern browsers block cross-site HttpOnly cookies. The platform deliberately does not let one origin authenticate another through its edge mesh.

## What I built instead

The solution wasn't to fight the reverse proxy, but to bypass cross-origin entirely. I configured a server-side rewrite proxy using `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "[https://crushedoreos-filmoid-backend.hf.space/api/:path](https://crushedoreos-filmoid-backend.hf.space/api/:path)*"
    }
  ]
}
```

By changing my frontend's environment variable to point to its own domain (`https://filmoid.vercel.app`), the browser sends the authentication cookie to Vercel, which securely tunnels the request directly to Hugging Face.

## The takeaway

The rule I keep coming back to: when your infrastructure is managed, you are playing by their networking rules. A `FastAPI` instance can be perfectly configured, but if it sits behind an edge proxy, the framework's middleware is a suggestion, not a guarantee.

Between automating the deployment with GitHub Actions and resolving an IPv4/IPv6 routing collision with Supabase's connection pooler, getting the ML logic to work was only 10% of the battle. The real engineering was finding a way to safely cross the boundaries the infrastructure put in place.

---

*Footnote: The deployment is now entirely automated. Pushing to the `master` branch triggers a GitHub Action that spins up an Ubuntu runner, checks out the repo with LFS enabled, builds a clean orphan branch with the necessary metadata, and force-pushes via a secure token. I never have to manually type `git rm -rf --cached .` from the project root again.*
