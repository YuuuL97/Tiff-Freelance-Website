# Tiffany Jung — freelance website

A complete static portfolio made with semantic HTML, shared CSS, and small JavaScript enhancements. No framework, package installation, external fonts, tracking, or external image requests.

## Open the website

Double-click **index.html** in this folder. The landing page, detail pages, links, and images also work without a web server. The site has not been published online.

Optional, with Node.js 18 or newer installed:

```sh
npm run preview
```

Open the local address printed in the terminal. Stop the preview with Control-C.

## Folder guide

- `index.html` — landing page containing Services, Recent Work, and Selected Experience.
- `services/` — five individual service pages, each with one image and its brief description.
- `projects/` — four individual project pages, each with one image and its brief description.
- `templates/` — ready-to-view project detail template.
- `assets/css/styles.css` — shared colours, typography, spacing, components, and responsive rules.
- `assets/js/main.js` — horizontal service and project card controls.
- `assets/images/` — your images; neutral placeholders are supplied.
- `content/` — editable text, image paths, contact details, and project/experience records.
- `src/templates/` — shared HTML source templates, including the header and footer in `layout.html`.
- `scripts/` — optional, dependency-free build, preview, and link-check helpers.
- `docs/` — editing and reference notes.

## Make changes

All finished `.html` pages are included. For maintainable edits, change `content/*.json`, the shared source templates, or the CSS/JavaScript, then regenerate the HTML:

```sh
npm run build
npm run check
```

No `npm install` is needed. Alternatively run `node scripts/build.mjs` and `node scripts/check.mjs`.

Edit `content/site.json` to change contact details, the intro, or the hero location line. Edit `content/projects.json` for project descriptions and `content/experience.json` for the landing-page experience entries. Keep approved listing copy intact when updating only the detail pages. See `docs/EDITING.md` for examples.

Generated HTML can be edited directly, but the next build overwrites those changes. Use the source templates and content files when you want changes to persist.

## Design and content

The supplied mockup is the visual reference, simplified to a landing page without top navigation or separate Services, Projects, and Experience listing pages. The site uses Helvetica Neue with Helvetica/Arial/sans-serif fallbacks, cream and beige surfaces, thin dividers, image-led cards, and the simple contact footer. Photographs and logos are deliberately replaced by placeholders.

Contact details were confirmed in the task. Castelli Gallery uses the requested correction: **Jan 2024 – Jan 2025**. Approved service and project descriptions appear on their detail pages. Projects without approved descriptions retain editable placeholders. Experience is presented only on the landing page.

The landing page keeps all service cards, four projects, and nine selected experiences. Service and project cards show their image and title; their descriptions appear only after opening the card. Each service/project detail page contains one image and one brief description. Selected Experience is a static grid with no links or individual pages; its text, spacing, and dividers are preserved. Return links lead back to the corresponding landing-page section. The obsolete “View all projects” link was removed with the Projects listing page.

## Before publishing

Replace the image and detail placeholders. Detail pages and blank templates include `noindex, nofollow` while their content is unfinished. Set an individual content record's `draft` field to `false` after completing it, then rebuild. Keep the blank templates unindexed and exclude `templates/` from a public upload if you do not need them online.

For static hosting, upload only `index.html` plus `assets/`, `services/`, and `projects/`. Keep `content/`, `src/`, `scripts/`, `docs/`, and this README local. Set canonical/absolute sharing URLs in the shared layout only after a real website domain is chosen.
