# Verification

Updated on 25 September 2026 after simplifying the site.

- Removed the top navigation and mobile menu from the shared layout and all generated pages.
- Removed the three standalone listing pages and their source templates.
- Rebuilt the landing page, fifteen individual detail pages, and two reusable templates: 18 pages total.
- All generated page links, section anchors, image paths, metadata, and landmark checks pass.
- Confirmed that the content data and landing-page image attributes are unchanged.
- Confirmed that the only removed landing-page body text is the obsolete “View all projects” link.
- Detail-page return links now lead to the Projects or Experience section of the landing page.
- Checked JavaScript syntax and CSS block structure.

The original browser QA limitation remains: visual browser testing was not completed because the local browser tools failed during the original build. No browser verification is claimed for this update.

## Selected Experience update

- Added Frieze Frame / Frieze Studios with its own linked detail page.
- Updated Jae Yong Kim Studio to Seoul, Korea; Juliana Cerqueira Leite to New York, NY with the Google Chelsea project note; and Colin Roberts to Production Support.
- Confirmed all content outside the Selected Experience section is unchanged. Recent Work remains unchanged pending review of suggested copy.
- Rebuilt all 18 pages and checked links, images, metadata, and anchors successfully.
- Updated experience dividers to handle the new ninth entry at desktop and mobile widths. Browser rendering has not been verified.

## Approved Recent Work update

- Applied the approved titles and descriptions for Frieze Seoul × Turkish Airlines, International Art Fair Management, and Artist × Brand Collaborations.
- Removed Public & Private Commissions and its detail page; rebuilt project navigation without broken links.
- Added the approved fair list to the International Art Fair Management overview.
- Confirmed all landing-page content outside Recent Work, styling, scripts, and unrelated content records remain unchanged.
- Current total: 17 pages; all local link, anchor, asset, metadata, and landmark checks pass.

## Simplified service and project pages

- Homepage service/project cards now contain images and titles only (with service numbers retained).
- All ten cards link to detail pages: five service pages and five project pages.
- Each of those detail pages contains exactly one image and its original short description; the project metadata, long sections, and gallery are no longer rendered.
- The two projects without approved summaries use a brief editable placeholder.
- All content data, experience pages, and homepage content outside the card rows are unchanged.
- Legacy project detail fields, including the approved fair list, remain in the editable content data.
- Current total: 22 pages. All local links, anchors, assets, metadata, and landmark checks pass.
- Browser inspection was attempted again but its process failed to start. Structural checks passed; visual browser QA is not claimed.

## Experience links removed and Recent Work revised

- Removed all nine experience hyperlinks, their individual pages, their detail template, and the experience page generator.
- Retained every experience record and all landing-page text; entry spacing, borders, and typography use identical CSS declarations on non-link wrappers.
- Removed Exhibition Production from Recent Work and deleted its detail page.
- Renamed the requested projects to Art Fair/ Exhibition Planning and Logistics and Administration; existing descriptions remain unchanged.
- Preserved the hero, Services, footer, and all unrelated content and scripts.
- Current total: 11 pages. All local links, anchors, assets, metadata, and landmark checks pass.
