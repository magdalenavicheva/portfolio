# magdalena.os

My portfolio, built as a desktop. About me, Projects, Experience, Skills and Contact are windows you can open, drag around, minimise to the dock and close. Every project opens in its own window with buttons to its GitHub repositories. On phones it turns into a home screen and windows open full-screen. It has a light and dark mode and is fully translated into English and Bulgarian.

It is a static site: React 19, TypeScript and Vite, tested with Vitest, Testing Library and Cypress. There is no server or db.

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
npm run dev       
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



