# XON Hospital — concise handoff

Updated: 2026-11-20. Read this and AGENTS.md before continuing. Verify live state before new claims.

## Project and authority

- Source: `/Users/amir-temur/Documents/Codex/xon-hospital`. Live: https://xon-hospital.uz ; CMS: https://xon-hospital.uz/admin.
- Next.js16.4.1 / TypeScript / React / Payload3.93 / PostgreSQL17 / Docker Compose / Caddy.
- Fornex VPS162.248.165.149, Ubuntu24.04, 1CPU /2GB RAM /20GB disk +2GB swap. Checkout `/opt/xon-hospital`.
- Locales: ru, uz, en, kk, tg. Publish translated URLs only when actual content exists.
- User authorizes improvements, verification and deployment; preserve CMS edits, navy/gold brand and transparent logo. Avoid repeated permission questions.
- **Do NOT add XON to Google Business Profile. Latest task: diagnose missing non-brand search visibility; CRM repair is complete.** The draft UI was closed; do not resume profile creation or terms acceptance.
- Skills are installed independently of this chat. Discover them in a new chat. This file is project context, not model memory; do not copy every skill into the prompt.

## Owner-confirmed facts

- Address: Ташкент, 8-й проезд Файзли,14. Uzbek: Toshkent, Fayzli8-tor ko‘chasi,14.
- Clinic24/7. Overnight ONLY on-duty therapist/internist and ENT. Other specialists:08:30 until approximately17:30–18:00, individual schedules. Do not advertise every named doctor overnight.
- Phone +998958661919. Map https://yandex.uz/maps/org/xon_hospital/63935219230/.
- Check-up packages are **in development**. No approved contents/prices. Page is a noindex status page, excluded from active offers and sitemaps.
- Never fabricate prices, reviews, qualifications, licence details, clinician review or ranking promises.

## Verified production state

- HTTPS, admin and local assets run on Fornex, without a runtime dependency on Render. Transparent brand asset public/xon-hospital-logo.webp; favicon version3 and ICO return200. OG fallback also uses transparent WebP.
- Google verification file google0160f4bd915f0982.html works at root and five language paths. Preserve Caddy responses.
- **Search Console verified root property https://xon-hospital.uz/: root sitemap Success,182 discovered URLs, last read Nov19. Russian sitemap Success,37 discovered URLs, last read Nov19.** Re-submitted through the user's Chrome; previous Russian Couldn't fetch is resolved.
- URL Inspection Nov19 confirms **/ru, /uz and /ru/articles/acne-causes-care-treatment are indexed**. /ru/services/dermatology was Discovered–currently not indexed; indexing request accepted with priority-queue confirmation. Do not claim it is indexed yet or resubmit repeatedly.
- Search Console Pages aggregate report still says Processing data/check again in a day or so. Discovered182 does NOT mean indexed182.
- Full read-only HTTP audit of all182 canonical URLs passed:200, title/description, oneH1, matching canonical/html language, no noindex, parseable JSON-LD and valid alternate targets. Some doctor titles match across Cyrillic locales because names/specialties match; do not alter names merely to make titles unique.
- Sitemaps root182; ru37, uz37, en36, kk36, tg36. Public robots allowed; admin/API excluded except media. Invalid locale and absent article translation404.

## Implemented features and content

- Instagram embeds on six doctors, two founder reels and location reel in Contacts. Existing YouTube retained. Reels are embeds, not downloaded/hosted MP4s. Map in Contacts/footer and schemahasMap.
- Reel IDs: founder DfFBaIAoZmj + Df4NZ7poib9; Ruslan DfKLM4FIOR3; Fayzullo DfOtyIlo8PU; Vohid DfUauc7I9Zd; Zafar DfWX_HtIDC0; Asilbek DfWk_eTINT-; location Dfy-vE_Ir3P.
- User called Zafar Muzaffarovich; existing slug zafar-abdirazzakov. Preserve existing name until confirmed.
- All11 doctors ×5 locales expanded to6–12 reasons to visit, preserving existing CMS text; repeat dry-run0 updates. Scripts doctorFocusData.ts / expandDoctorFocus.ts.
- Original acne article ru+uz,11 sections,838/715 words,8 clinical sources; outline navigation and mobile typography verified. Publisher only creates absent slug. No fabricated clinician reviewer.
- Localized service search titles with Tashkent; truthful Service and ProfilePage/Person structured data. Service→article→doctor links and night-care notices. Address/hours updated all5 CMS locales.
- Dermatology, gastroenterology and ultrasound enriched in ru+uz:5 original sections per page, reasons and related doctor. Only empty service content filled; custom edits preserved. Repeat dry-run0 changes.
- Prevention articles blood-pressure-at-home and movement-for-prevention expanded in ru+uz via5431605:7 sections, approximately300–350 words each, clinical sources and practical explanations. Publisher only appends to exact known starter content and skips drafts/custom edits. Other locale translations are preserved. Verify publication log/live pages before claiming completion if this handoff is interrupted during deployment.
- Article source movement-for-prevention now relates to therapy rather than unavailable check-up. DB relation was already corrected.

## Source, deployment and recovery

- Local main pushes to **codex/vps-production**. Remote main diverges; do NOT force-push it. Production pulls `git pull --ff-only origin codex/vps-production`.
- Web/tooling source c1da8ae deployed on Nov20. It includes pending Nov19 repairs plus the CRM interaction/role guidance fixes. Production Docker build passed; old image retained as rollback-crm-20261120. Documentation-only commits do not require a web rebuild.
- See docs/DEPLOYMENT.md. Never print .env.production, credentials or patient data.
- Preserve previous web image rollback tag before builds. Existing rollback-1a7ef50 and rollback-before-local-seo tags retained. Keep old web serving during build. Do not prune volumes.
- Build web with production Compose; tooling-only changes: `docker compose --env-file .env.production -f compose.production.yml build migrate`. Run CLI via `run --rm migrate pnpm exec tsx src/scripts/…`.
- Root-only, integrity-checked pg_dump gzip backups in `/opt/xon-backups`: before-evidence, before-doctor-focus, before-local-seo, before-service-content, before-prevention-expansion (all20261119).
- Disk80% at latest login; monitor before large rebuilds. No uncontrolled image/cache/volume cleanup.
- SSH sessions may expire. Credentials shared in earlier screenshots must never be stored in this document.

## Checks and realistic next work

- `pnpm exec tsc --noEmit`; targeted ESLint for changes. All passed for current scripts. Web production build previously passed forf17724f.
- Reusable public HTTP audit: `python3 scripts/audit-live-seo.py --output /tmp/xon-seo.json`. It measures HTML checks, NOT Google index counts, ranking or field Core Web Vitals.
- docs/SEO_PLAN.md records competitor findings, priorities and limits. User's screenshots establish XON is already searchable; Horev's business panel/sitelinks cannot be forced with schema.
- Useful next content groups: hair loss/eczema after dermatology, heartburn after gastroenterology, headache after neurology. Research each from clinical sources, write original explanations, seek real clinician review. No mass lightly rewritten competitor articles.
- Add licence/approved prices/reviewer details only when supplied. No paid ads or budget approved. GA4 is now authorized/configured as described below.
- Ranking and recrawl timing belong to Google. Do not promise#1, exact sitelinks, immediate favicon refresh, or index coverage of every sitemap URL.

## Search visibility diagnosis — Nov20

- Fresh signed-in Search Console URL Inspection confirms `/ru`, `/ru/services/oncology` and `/ru/services/inpatient`: **URL is on Google / Page is indexed**. No repeat indexing requests submitted for these indexed pages.
- Performance **24 hours** (Nov19–20; UI last update3.5h ago):8 impressions,2 clicks. Visible query `xon hospital`:6 impressions,2 clicks. Remaining query detail not shown; do not infer all impressions are branded or invent positions for generic terms. Aggregate average position3.1 does NOT establish ranking for the user's generic queries.
- Default3-month report initially showed zero and a chart endingNov17, before launch; switching to24h revealed recent data. Pages aggregate report still processing; total indexed URL count remains unknown.
- Repeated public HTTP audit:182 unique sitemap URLs,0 checked HTML issues; report `/private/tmp/xon-seo-20261120.json`. This is crawlability, not182 indexed URLs.
- Actual inpatient page content is sparse: a one-sentence description repeated, appointment form, navigation/footer; no substantive admission/stay details. Oncology has reasons, procedures, two doctors and FAQ. Prioritize accurate inpatient information and deeper service-specific content, rather than claiming an indexing outage. Obtain real admission scope, room information, approved prices and responsible doctors before publishing such clinic-specific claims.
- Evidence screenshots `/private/tmp/xon-search-performance-20261120.png`, `/private/tmp/xon-oncology-indexed-20261120.png`, `/private/tmp/xon-inpatient-indexed-20261120.png`. Search Console data is provisional and time-bound; do not promise exact ranking dates.

## CRM and Analytics — Nov20 repair

- User-designated chief: amirtemurtoshpulatov@gmail.com. Existing account promoted to owner on Nov19. Roles: owner (all + staff + lead deletion), manager (leads/status/comments; no deletion), editor (site content; no leads). Users cannot escalate their own role; last owner protected from demotion/self-deletion.
- Schema migration20261119_175235_crm_roles_comments applied successfully Nov19 after checked backup `/opt/xon-backups/before-crm-20261119.sql.gz`. Separate PostgreSQL clean-install/upgrade/repeat migration test passed. No new schema change for Nov20 repair.
- Nov20 production had TWO leads, both new; data remained in PostgreSQL. UI list was broken by `/api/leads` public POST route shadowing Payload REST GET (405). Fixed forwarding GET/PATCH/DELETE/PUT/OPTIONS to Payload; authenticated owner/manager POST delegates to Payload while anonymous booking keeps its existing validation/rate limit. Never expose public lead reads.
- CRM moved above Analytics; explicit drag handle, destination highlight, arrow-key and select alternatives; role-management links plus instructions. Busy controls prevent switching comment threads while saving; aborted comment fetches do not overwrite another thread. Load failure no longer claims there are zero leads.
- Local browser verified list loading and persisted status change; role list/owner access visible. Vitest16 tests passed: dashboard workflows, drag/drop save, keyboard move, comment creation, fetch retry, owner staff creation/assignment, manager/editor access restrictions, deletion/history, consent/data boundaries. TypeScript and targeted ESLint passed.
- Production repair verified Nov20 in the owner's signed-in Chrome: “Показано 2 из 2 заявок”, explicit drag handles and staff-management links visible, previous load error gone. Real leads were not modified for QA. Separate local browser verified persisted status change and visible role choices; test screenshot /private/tmp/xon-crm-fixed-20261120.jpg contains synthetic data only.
- GA4 account417033880 / property565251087 / stream16376605318. Public measurement ID **G-TR49WKDCGR**. Reports: https://analytics.google.com/analytics/web/#/a417033880p565251087/reports/intelligenthome.
- User explicitly authorized ONLY FREE GA4/Data API, free Cloud project xon-hospital-analytics, service account xon-analytics-reader@xon-hospital-analytics.iam.gserviceaccount.com with Viewer on this property only (no cost/revenue metrics), and private key only on VPS. User personally clicked Enable accepting API terms; API observed Enabled. No billing or paid services enabled.
- Credential file `/opt/xon-hospital/credentials/ga-service-account.json`, UID1001/mode400, readonly mount `/app/credentials`; temporary downloaded copy removed. It is gitignored and Dockerignored. Never print/read out key contents, tokens or .env values.
- Server env GA_MEASUREMENT_ID, GA_PROPERTY_ID, GA_SERVICE_ACCOUNT_FILE configured. End-to-end GA4 verified Nov20: no Google script before consent; after Allow, the public /ru page loads exactly the expected G-TR49WKDCGR gtag script with no browser JavaScript errors. A real test visit was received: Data API state ready, activeNow1; the signed-in Google Analytics UI also showed1 active user. Historical users/sessions/views were still0 at that moment because standard reports had not populated yet. Proof report /tmp/xon-ga-live-check-20261120.log on VPS. Do not interpret zero historical counters as a disconnected tag.
- GA tags only frontend, only after analytics consent; no admin/form data, queries/fragments, personal identifiers or ad personalization. Aggregate dashboard cache5min; metrics7/28/90days and realtime30min.
- Local QA DB `/private/tmp/xon-crm-qa-20261119.db` contains ONLY synthetic fixtures. Stop the local dev server after QA. Do not store test passwords here.

## New-chat starter

“Продолжаем XON Hospital. Открой /Users/amir-temur/Documents/Codex/xon-hospital, прочитай AGENTS.md и docs/PROJECT_STATE.md, проверь git status. Продолжи работу над сайтом и SEO. Карточку Google Business не создавай.”
