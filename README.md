# Peace of Mind Planning — Landing Page

Static one-page site for the "Peace of Mind Planning" YouTube brand.
Purpose: canonical entity for Google Knowledge Graph (`sameAs` JSON-LD) + link hub.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Self-contained page (inline CSS, no JS dependencies) |
| `logo.png` | Tree of life logo (also used as favicon) |
| `robots.txt` | Search engine directives |
| `sitemap.xml` | Single-page sitemap |

## Setup: Replace Placeholders

Before deploying, find-and-replace these placeholders in **all files** (`index.html`, `robots.txt`, `sitemap.xml`):

| Placeholder | Example |
|---|---|
| `{{DOMAIN}}` | `peaceofmindplanning.com` |
| `{{YOUTUBE_URL}}` | `https://www.youtube.com/@PeaceOfMindPlanning` |
| `{{YOUTUBE_CHANNEL_ID}}` | `UCxxxxxxxxxx` (for latest video embed) |
| `{{LINKEDIN_URL}}` | `https://www.linkedin.com/company/peace-of-mind-planning` |
| `{{FACEBOOK_URL}}` | `https://www.facebook.com/PeaceOfMindPlanning` |
| `{{X_URL}}` | `https://x.com/POMPlanning` |
| `{{INSTAGRAM_URL}}` | `https://www.instagram.com/peaceofmindplanning` |
| `{{PINTEREST_URL}}` | `https://www.pinterest.com/peaceofmindplanning` |
| `{{CONTACT_EMAIL}}` | `hello@peaceofmindplanning.com` |
| `{{AUTHOR_NAME}}` | Your name (not shown on page, for your records) |

## Deploy on Cloudflare Pages (free)

1. Push this folder to a GitHub/GitLab repo (or use Direct Upload).
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) > **Workers & Pages** > **Create** > **Pages**.
3. Connect your repo or drag-and-drop the `landing` folder.
4. Build settings: **Framework preset** = None, **Build command** = (leave empty), **Build output directory** = `/` (or `.`).
5. Click **Save and Deploy**.
6. Your site is live at `<project>.pages.dev`.

### Custom domain on Cloudflare Pages

1. In Pages project > **Custom domains** > **Set up a custom domain**.
2. Enter your domain (e.g. `peaceofmindplanning.com`).
3. If the domain is on Cloudflare DNS, the CNAME is added automatically.
4. If external DNS, add a CNAME record: `@` -> `<project>.pages.dev`.
5. Wait for SSL certificate (automatic, ~minutes).

## Deploy on GitHub Pages (free)

1. Push this folder as a GitHub repo.
2. Go to repo **Settings** > **Pages**.
3. Source: **Deploy from a branch**, branch = `main`, folder = `/ (root)`.
4. Save. Site goes live at `https://<username>.github.io/<repo>/`.

### Custom domain on GitHub Pages

1. In repo **Settings** > **Pages** > **Custom domain**, enter your domain.
2. Add DNS records:
   - **A records** (apex domain):
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME** (www): `<username>.github.io`
3. Check **Enforce HTTPS**.
4. Wait for DNS propagation + SSL (~minutes to hours).

## Validate

- **JSON-LD**: [Google Rich Results Test](https://search.google.com/test/rich-results)
- **Lighthouse**: Chrome DevTools > Lighthouse > run all categories
- **Mobile**: Chrome DevTools > toggle device toolbar (375px width)
