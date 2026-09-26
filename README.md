# magdalena.os

My portfolio, built as a small olive-green desktop. About me, Projects, Experience, Skills and Contact are windows you can open, drag around, minimise to the dock and close. Every project opens in its own window with buttons to its GitHub repositories. On phones it turns into a home screen and windows open full-screen. It has a light and dark mode and is fully translated into English and Bulgarian.

It is a static site: React 19, TypeScript and Vite, tested with Vitest, Testing Library and Cypress. There is no server or database, so hosting is free and nothing can go down.

```
portfolio/
├── frontend/          the site (all content lives in src/content/ and src/i18n/)
└── .github/workflows/ CI: lint, unit tests, build, Cypress
```

---

## 1. Run it on your laptop

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Tests:

```bash
npm test           # Vitest
npm run cypress    # Cypress (with npm run dev running)
```

---

## 2. Change the content

You never need to touch the components to update the site:

- `frontend/src/content/projects.ts`: the projects (both languages, stack, GitHub links, icon colour). The first project gets the "Latest" tag.
- `frontend/src/content/profile.ts`: skills, experience, education, courses and contact details.
- `frontend/src/i18n/strings.ts`: every other piece of text, in English and Bulgarian.
- `frontend/public/Magdalena_Vicheva_CV.pdf`: the CV behind the download buttons. Replace it with a newer PDF using the same file name.
- `frontend/src/assets/`: the photos.

---

## 3. Put it online with your own domain (about €12 a year)

The site is hosted for free on **Cloudflare Pages**. The only cost is the domain.

### Step 1: push to GitHub

Create a **public** repo called `portfolio` on github.com/magdalenavicheva (the footer links to it), then:

```bash
cd portfolio
git init && git add . && git commit -m "Portfolio: magdalena.os"
git branch -M main
git remote add origin https://github.com/magdalenavicheva/portfolio.git
git push -u origin main
```

The **Actions** tab runs all the tests on every push.

### Step 2: buy the domain

Make a free account at dash.cloudflare.com. Go to **Domain Registration → Register Domains** and buy one, e.g. `magdalenavicheva.com` or `vicheva.dev`. Cloudflare sells domains at cost with no renewal price jumps.

### Step 3: connect Cloudflare Pages

1. Go to **Workers & Pages → Create → Pages → Connect to Git** and choose `portfolio`.
2. Use these build settings:
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variable: `CYPRESS_INSTALL_BINARY` = `0` (keeps builds fast)
3. **Deploy**. You get a free `*.pages.dev` address straight away.
4. **Custom domains** → add `yourdomain.com` and `www.yourdomain.com`. Because the domain is on Cloudflare, DNS and HTTPS are set up for you.

From now on, every `git push` to `main` updates the live site within a minute.

---

## 4. Sharing a specific project

Opening a project puts it in the address bar, e.g. `https://yourdomain.com/#triply`. Send that link and the site opens with that project already on screen. The ids are `triply`, `driessen`, `bas`, `redbell`, `nera` and `popcorn`.
