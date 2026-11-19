# XON Hospital — concise handoff

Updated: 2026-11-19. Verify live facts before making new claims.

## Project and preferences

- Source: `/Users/amir-temur/Documents/Codex/xon-hospital`.
- Production: https://xon-hospital.uz ; CMS: https://xon-hospital.uz/admin.
- Existing stack: Next.js 16, TypeScript/React, Payload CMS 3, PostgreSQL, Docker Compose and Caddy.
- Host: Fornex VPS, Ubuntu 24.04, 162.248.165.149, 1 vCPU / 2 GB RAM / 20 GB disk. Server checkout `/opt/xon-hospital`.
- Locales: ru, uz, en, kk, tg. Only publish translated URLs with actual content.
- User wants complete implementation, testing and deployment within already authorized scope; avoid repeated permission questions.
- Keep brand navy/gold, transparent logo, restrained founder presentation. Preserve CMS edits.
- Use installed `professional-web-builder` for substantial work and its QA guide before deployment. Follow Next.js docs shipped with the actual dependency, as required below in AGENTS.md.
- User installed skills are independent of this conversation. Discover available skills in a new chat; do not paste every skill into the prompt. This file records project facts, not hidden model memory.

## Verified production state

- HTTPS, self-hosted Payload admin and local public assets work on Fornex; there is no runtime dependency on Render.
- Transparent brand asset: public/xon-hospital-logo.webp. Favicon version 3. Legacy JPEG remains an OG fallback.
- Google HTML verification works at root and all five language paths for google0160f4bd915f0982.html. Preserve the Caddy responses/file.
- On 2026-11-19, submitted https://xon-hospital.uz/sitemap.xml in the VERIFIED ROOT URL-prefix Search Console property https://xon-hospital.uz/ using the user's signed-in Chrome.
- Search Console detail page then showed **Sitemap processed successfully**, **185 discovered pages**, last read 11/19/26. This is discovery, NOT proof of 185 indexed pages.
- Root sitemap validated as XML with 185 URLs; HTTP 200 application/xml. robots.txt allows public pages and advertises the sitemap; excludes admin/API except public media files.
- Existing erroneous /ru/sitemap.xml submission was not removed. Locale sitemap routes now work, so this previously missing URL returns a valid Russian map.

## Deployed update: 7ee1146 (2026-11-19)

- Added per-language sitemap handlers backed by shared clinicSitemap, maintaining cross-language alternates.
- Added actual Instagram embeds to six doctor profiles, second founder reel, location reel to Contacts, Yandex Maps link in Contacts/footer and hasMap in clinic schema.
- Reel IDs: founder DfFBaIAoZmj + Df4NZ7poib9; Ruslan DfKLM4FIOR3; Fayzullo DfOtyIlo8PU; Vohid DfUauc7I9Zd; Zafar DfWX_HtIDC0; Asilbek DfWk_eTINT-; location Dfy-vE_Ir3P.
- User called Zafar “Muzaffarovich” but existing profile slug is zafar-abdirazzakov. Preserve the profile name pending confirmation; attach the user-mapped reel.
- Official map: https://yandex.uz/maps/org/xon_hospital/63935219230/. Do not infer street/geo from the viewport coordinates in the shared URL.
- Added long-form article outline component and original acne article source in src/scripts/acneArticle.ts, ru + uz. Publisher src/scripts/publishEvidenceArticles.ts creates ONLY if slug absent; never overwrites existing CMS articles. It was run successfully against production with a fresh tooling image.
- Published https://xon-hospital.uz/ru/articles/acne-causes-care-treatment and its /uz/ counterpart. 11 sections each, 838 Russian / 715 Uzbek words, eight clinical references. No author/reviewer fabricated.
- Production Docker build passed, web container replaced successfully, logs contain no runtime errors. TypeScript and targeted ESLint passed. All six sitemap XMLs validated: root187, ru38, uz38, en37, kk37, tg37, with no duplicate URLs. Google previously read185; the new two URLs await Google's next read.
- Confirmed all six doctor pages contain the supplied Instagram embeds, founder has two. Existing YouTube introductions retained where applicable. Both new article pages have correct canonical URLs, 11 working section anchors and no noindex. Missing English translation and invalid-locale sitemap return404.
- Database backup before publication: /opt/xon-backups/before-evidence-20261119.sql.gz, root-only permissions, gzip integrity checked. Rollback image xon-hospital-web:rollback-1a7ef50 preserved.
- Article hero typography fixed and deployed in824fc5c; desktop and mobile screenshots checked. Mobile390px has no horizontal overflow; section-anchor click verified.
- User requested expanding “С чем можно обратиться” for ALL doctors. Implemented via CMS, source7ae8ba5: src/scripts/doctorFocusData.ts + expandDoctorFocus.ts. Preserves all existing entries, adds6–8 specific reasons per specialty. Applied55 localized profiles (11 doctors ×5 locales), verified all55 live pages now have6–12 reasons. Repeat DRY_RUN=1 reports0 changes, proving idempotence. Backup /opt/xon-backups/before-doctor-focus-20261119.sql.gz verified before mutation. No web rebuild needed for these CMS changes.
- Existing two CMS prevention articles and two fallback guides remain short: expand in subsequent content batches, preserving editorial changes. No claim of clinician review until one actually occurs.

## Deploy and checks

- See docs/DEPLOYMENT.md. Never print .env.production or credentials.
- Production tracks codex/vps-production; push local HEAD there without force. Do not overwrite divergent remote main.
- Preserve current web image as rollback tag before rebuild; keep serving old web during build. No DB schema changes for current update.
- Commands: pnpm exec tsc --noEmit; targeted ESLint; production Docker web build; up -d --no-deps web. Build migrate tooling separately for CLI scripts.
- Watch disk: 76% used at start of this update. Prefer targeted unused builder-cache cleanup only if needed; never prune volumes or the rollback image.
- Test sitemap XML each locale, missing locale 404, localized article metadata/alternates, body headings, sources, video URLs, map link, mobile and desktop layout. Inspect production logs after upgrade.
- SSH passwords were shared in old screenshots. Never copy them into this file. A new chat may need the user to establish a fresh SSH session or authorized key access.

## SEO and editorial next steps

- LATEST ACTIVE REQUEST: audit and compare SEO of kmediwell.uz/pakety, horevmedical.uz, mclinic.uz, www.imed-clinic.com; explain ALL realistic acquisition/SEO paths and start implementation. Additional screenshots show XON already appearing as a normal Google result, versus Horev's Google business entity panel (photos/map/reviews), plus sitelinks. User wants comparable/better appearance. Explain normal listing vs Business Profile vs automatically chosen sitelinks; do not promise exact Google layout or#1.
- Read-only audit collected2026-11-19 in /tmp/xon-competitors-20261119.json. Current HTTP: K Mediwell /pakety redirectswww,200 with meta robots noindex, generic titleKMediwell, no description, zero JSON-LD blocks, sitemap525 URLlocs. Shared UTM isGoogleCPC. Not a pure organic-ranking example. Horev homepage200, specific title, description, canonical,4hreflang,3JSON-LD blocks; robots/sitemap403 for our requests (do not claim Google is blocked). Mclinic direct Python TLS failed; web tool accessed its homepage/checkups. iMed200 home has title/description, no canonical/hreflang/JSON-LD detected, robots/sitemap404 for these paths (not proof no sitemap elsewhere). Competitor success cannot be causally attributed to these checks.
- Read primary Google docs on helpful content, Business Profile local ranking, ProfilePage schema and spam policies. Competitor excerpts in web tool. K Mediwell accessible via https://www.kmediwell.uz/pakety; Horev dermatology page https://horevmedical.uz/dermatologiya ; Mclinic https://mclinic.uz/checkups/.
- Root favicon.ico DOES work:200 image/x-icon, current metadataicons usev3. Globe in Google's screenshot likely awaits refresh; don't invent a404 or repeatedly rename the favicon. Already confirmed homepage correct native favicon in browser.
- Pending async question asks user exact clinic street/building/landmark, working hours, existing Google Maps Business Profile URL, confirmed checkup-package composition/prices. No reply yet. Yandex org page blocked in web tool; do not infer address from mapviewport. Continue independent technical improvements meanwhile.
- Planned next concrete SEO improvements: localized search titles for actual existing services, truthful ProfilePage/Person and Service JSON-LD, related-article links from service to article and article to doctor to connect topics; auditable competitor report/query mapping and staged SEO plan. Not implemented yet. Prioritize real content over fictitious new services/packages.
- Google decides when and what to index; no guarantee of #1 placement. Follow Search Console Pages/URL inspection for real status.
- Articles should answer real patient questions, explain terminology, include clinical references and link to relevant services. Write original syntheses; do not lightly paraphrase competitor pages at scale.
- Prioritize a coherent topic group: acne, post-acne marks/scars, eczema, hair loss; then headache, blood pressure, low back pain, evidence-based prevention. Research each separately; do not publish unsupported treatment promises.
- Expert review is done in CMS reviewerName only after actual review. Never fabricate a doctor author/reviewer, statistics, clinic hours, street address, prices or patient testimonials.
- Latest competitor reference supplied for structure: https://www.medcentrservis.ru/disease/akne/. Medical basis for the new article: NIAMS, NHS, AAD acne guideline update 2024 and patient guidance; citations stored with article.

## New-chat starter

“Продолжаем XON Hospital. Открой /Users/amir-temur/Documents/Codex/xon-hospital, прочитай AGENTS.md и docs/PROJECT_STATE.md. Проверь git status и продолжи оставшиеся задачи. Используй существующие скиллы, не перечитывай весь старый чат.”
