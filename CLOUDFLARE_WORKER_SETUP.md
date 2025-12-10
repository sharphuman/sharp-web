# Sharp Human Blog Proxy - Cloudflare Worker Setup

## Why This Is Better for SEO

| Method | SEO Impact |
|--------|------------|
| ❌ External link to ghost.io | Blog doesn't help your domain |
| ⚠️ _redirects with 200 | Partial proxy, some SEO leakage |
| ✅ **Cloudflare Worker** | **Full proxy, maximum SEO benefit** |

The Worker:
- Makes Google see `/blog` as native content on sharphuman.com
- Rewrites all internal links to stay on your domain
- Adds proper canonical tags
- Controls caching for performance
- Handles redirects correctly

---

## Setup Instructions (10 minutes)

### Step 1: Create the Worker

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account
3. Click **Workers & Pages** in the sidebar
4. Click **Create** → **Create Worker**
5. Name it: `sharp-blog-proxy`
6. Click **Deploy** (deploys default "Hello World")

### Step 2: Add the Code

1. Click **Edit Code** on your new worker
2. Delete the default code
3. Copy/paste the entire contents of `cloudflare-worker.js`
4. Click **Save and Deploy**

### Step 3: Add Route (Connect to Your Domain)

1. Go back to your Cloudflare Dashboard
2. Click on **sharphuman.com** (your domain)
3. Go to **Workers Routes** in sidebar
4. Click **Add Route**
5. Add these routes:

```
Route: sharphuman.com/blog*
Worker: sharp-blog-proxy

Route: sharphuman.com/rss*
Worker: sharp-blog-proxy

Route: sharphuman.com/sitemap*
Worker: sharp-blog-proxy
```

### Step 4: Update _redirects (Remove Blog Rules)

Since the Worker handles `/blog`, update your `_redirects` to:

```
# Worker handles /blog, /rss, /sitemap
# This file just handles the SPA fallback

/* /index.html 200
```

### Step 5: Test It

1. Visit `https://sharphuman.com/blog`
2. Should show your Ghost blog content
3. URL should stay as `sharphuman.com/blog`
4. Click around - all links should stay on sharphuman.com

---

## Verify SEO Is Working

### Check 1: View Source
- Visit `sharphuman.com/blog`
- View page source
- Look for `<link rel="canonical" href="https://sharphuman.com/blog"`
- All URLs should reference `sharphuman.com`, not `ghost.io`

### Check 2: Google Search Console
- After a few days, check Google Search Console
- Your blog posts should index under `sharphuman.com/blog/*`

### Check 3: Social Sharing
- Share a blog post on LinkedIn/Twitter
- Preview should show `sharphuman.com` as the source

---

## Troubleshooting

### Blog shows but styling is broken
- Check browser console for errors
- May need to adjust Ghost theme's asset URLs

### "Too many redirects" error
- Make sure you removed `/blog` rules from `_redirects`
- Worker handles all `/blog` traffic now

### Worker not triggering
- Check Workers Routes are correct
- Route pattern should be `sharphuman.com/blog*` (with asterisk)

### Ghost admin doesn't work
- Add another route: `sharphuman.com/ghost*` → `sharp-blog-proxy`
- Or access admin directly at `sharphuman.ghost.io/ghost`

---

## Cost

Cloudflare Workers Free Tier:
- **100,000 requests/day** free
- More than enough for a business blog
- No credit card required

---

## Files Reference

```
sharp-web-main/
├── cloudflare-worker.js    # ← Deploy this to Cloudflare Workers
├── public/
│   ├── _redirects          # ← Simplified (Worker handles blog)
│   └── index.html          # ← Already updated with /blog links
```
