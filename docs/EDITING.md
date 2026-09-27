# Editing the portfolio

## Add your images

1. Put the image files in `assets/images/`. Use short lowercase filenames with hyphens, such as `frieze-korea-01.webp`.
2. Update the appropriate `image` path in `content/services.json` or `content/projects.json`.
3. Write a short, useful `imageAlt` description for a meaningful photo. Leave it empty only when the image is decorative or duplicates nearby information.
4. Run `npm run build`.

The home hero uses a solid beige background with no image. Edit `heroEyebrow`, `intro`, and `heroLocation` in `content/site.json` to change the introduction. The intro is italic, and the separate location line is bold. The former `serviceImage` fields are retained in the data but are no longer used.

The layouts crop photos with `object-fit: cover`, preserving the existing card and detail box proportions. Set `imagePosition` (for example, `50% 70%`) to adjust a photo’s focal point. Set `imageFit` to `contain` for a logo that must remain fully visible; its box size stays unchanged. The optional `detailImage`, `detailImageAlt`, `detailImageWidth`, and `detailImageHeight` fields select a different image on the detail page. Recommended source sizes: 1200 × 720 for landscape cards, and 900 × 1000 for project portraits. Actual photos should be compressed WebP/AVIF/JPEG files. Keep width/height attributes in the templates so the layout remains stable while images load.

## Service and project descriptions

The landing-page cards show only an image, title, and service number where applicable. Clicking a card opens a page with one image and one brief paragraph.

- Edit `description` in `content/services.json` for service detail copy.
- Edit `summary` in `content/projects.json` for project detail copy.
- Edit `image` and `imageAlt` to replace the single detail image and its matching card image.
- Both page types use `src/templates/simple-detail.html`. The reusable project example is `templates/project-detail.html`.

Projects without a summary show an editable short-description placeholder. Legacy project fields (`years`, `role`, `location`, `overview`, `approach`, `outcome`, and `gallery`) are retained in the source data but are not displayed in the simplified layout. This preserves previously supplied information, including the art-fair list, for future use.

Paragraph breaks can be written as `\n\n` inside a JSON string. Avoid raw HTML; text is escaped by the build script.

## Selected Experience

Edit `title`, `role`, `location`, and the optional `note` in `content/experience.json`. These entries appear only in the landing-page experience grid and do not link anywhere. The former detail-page fields are retained as source material but are not displayed. Individual experience pages and their templates have been removed.

## Add a new service, project, or experience

Duplicate a record in the corresponding content file. Give it a unique lowercase `slug` for projects/experience or `id` for services, using letters, numbers, and hyphens. For services and projects this becomes the detail-page filename; experience records appear only on the landing page. Complete the relevant content, then rebuild.

The existing project `categories` fields are retained as content metadata. The simplified site has no separate project listing or category filters; all project records appear in the landing-page carousel.

Use the optional `note` field for a short project note beneath an experience role. The existing `featured` field is retained as content metadata and no longer controls a separate listing. All experience records appear in the homepage's selected experience grid. The grid includes the requested Frieze Frame / Frieze Studios entry and adjusts its dividers to the number of entries.

New service and project records create a detail page with a title, return link, image, brief description, and shared footer. New experience records add a non-clickable entry to the landing page.

If a slug changes or a record is removed, remove its old generated file manually from `services/` or `projects/`. The builder intentionally does not delete files.

## Colours and type

Edit the variables at the beginning of `assets/css/styles.css`. `--color-beige` controls both the home intro and contact footer so they always match. All type uses the `--font-sans` stack. There are no remote font requests.

## Accessibility and browser behaviour

- The landing page has no top navigation or mobile menu. Complete page content and detail links remain available without JavaScript.
- Card rows support swipe, trackpad scrolling, keyboard scrolling, and previous/next buttons.
- Every page has a skip link, one main landmark, and one primary heading.
- Reduced-motion settings are respected.
- Contact links open the visitor's email or telephone application; there is no contact form backend.

## Reference decisions

- Text and structure follow the supplied composite mockup, with the user's corrected Castelli dates and the requested removal of top navigation and the three standalone listing pages.
- Service and project descriptions are shown only on their individual pages, with one image each.
- The service and project carousel shows three complete cards and a partial next card on wide displays.
- The footer contains only the Contact Me button and contact details.
- Detail pages are intentionally unfinished content templates, excluded from indexing by default.

## Uploaded images — September 2026

Original uploads are preserved in `assets/images/website image/`. The site uses compressed WebP copies in `assets/images/optimized/` for photos, including converted HEIC files. To replace a photo, update the source and create a new browser-friendly copy; the builder does not convert images automatically.

- `Landing Image.png`: preserved original; no longer displayed in the text-only landing hero.
- `Exhibitions & Art Fairs Combined.svg`: the same combined Art Basel and Frieze image on the Exhibitions & Art Fairs card and detail page. This self-contained SVG embeds the original logo artwork; both source files (`Exhibitions & Art Fairs 1.svg` and `Exhibitions & Art Fairs 2.avif`) are preserved.
- `Studio & Gallery Operations.HEIC`: matching service.
- `Art Sales & Client Relations.HEIC`: matching service.
- `International Logistics.HEIC`: International Logistics service.
- `International Logistics 1.HEIC`: Logistics and Administration project.
- `Frieze Seoul x Turkish Airliens .jpg`: Frieze Seoul × Turkish Airlines project.
- `International Art Fair Management.JPG`: Art Fair/ Exhibition Planning project.
- `Artist x Brand Collaboration.JPG`: Artist × Brand Collaborations project.
- `Archives & Artist Support.jpg`: Archives & Artist Support service.

`Christies.HEIC` and `Gallery Shot.JPG` have no confirmed placement yet.
