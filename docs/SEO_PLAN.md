# XON Hospital: SEO audit and implementation plan

Audit date: 2026-11-19. Public-page observations, not a measured ranking/traffic study.

## What the user's Google screenshots establish

XON Hospital already appears as a normal Google result, so at least that URL is indexed. This is separate from Search Console discovering all sitemap URLs. The screenshot shows a good, relevant title/description, but Google displays a globe instead of the available favicon and uses the domain as site name.

Horev's screenshot combines an ordinary result, automatically chosen sitelinks, and a Google business/entity panel containing photos, map, reviews and contact details. These require consistent business identity and local-profile work as well as a good website. A website cannot force this exact layout, a review score, or a top ranking. Hotel-price/Booking.com elements visible in that example are not a clinic SEO target.

## Competitor observations

| Site / page inspected | Useful pattern | Direct technical observations and limits |
| --- | --- | --- |
| [K Mediwell packages](https://www.kmediwell.uz/pakety), [BASIC](https://www.kmediwell.uz/pakety/basic-checkup) | Separate programme pages; visible composition, duration, prices and conversion route. | /pakety redirected to www and returned200, titleKMediwell, meta robots noindex, no description or JSON-LD detected in that response.21H1 elements. Sitemap525locs. The user's URL contains CPC/ad tracking. This specific page is not evidence that copying a package page produces organic rankings. |
| [Horev](https://horevmedical.uz/), [dermatology](https://horevmedical.uz/dermatologiya) | Detailed specialty pages: reasons to visit, assessments, doctor, preparation and FAQ; local contact information. | Home200, oneH1, title/description/canonical, fourhreflang links, threeJSON-LD blocks including MedicalClinic. Our requests to /robots.txt and /sitemap.xml returned403; that does NOT prove Google is blocked. Content and medical claims are not ours to copy. |
| [M-Clinic](https://mclinic.uz/), [checkups](https://mclinic.uz/checkups/) | Distinct services, prices, staff, articles and programme pages; information about the clinic and licence. | Web retrieval succeeded. A separate Python HTTPS fetch failed with a TLS alert; no sitewide technical conclusion follows. No backlink, speed or Search Console data available. |
| [iMed](https://www.imed-clinic.com/) | Clear diagnostic offerings, individual doctors and visible address/phone/hours. | Home200 with title/description; canonical/hreflang/JSON-LD not detected in fetched HTML. /robots.txt and /sitemap.xml returned404. Sitemaps could be elsewhere, and neither missing file proves a site cannot rank. |

These are observed patterns and opportunities, not proven causes of competitors' positions. No keyword volume, backlink count, domain-age estimate, Core Web Vitals result or ranking number has been fabricated.

## Owner-confirmed business facts

- Address: Ташкент, 8-й проезд Файзли,14. [Owner's building link](https://yandex.uz/maps/10335/tashkent/house/fayzli_8_tor_ko_chasi_14/YkAYdABlSEIEQFprfX5yeXlhbA==/).
- Clinic24/7. Overnight: on-duty internist/therapist and ENT only. Other named specialists: from08:30 until approximately17:30–18:00 according to individual schedules. Do not advertise every named doctor as available overnight.
- Phone: +998958661919. [Official Yandex organisation](https://yandex.uz/maps/org/xon_hospital/63935219230/).
- Check-up packages are in development. Do not invent programmes, contents, prices, launch dates or availability. Temporarily exclude their page from indexing/active offers; keep a clear status page.
- Existing Google Business Profile URL/management access, legal entity/licence details, approved treatment prices and a clinician reviewer are not yet supplied. Do not invent them or create duplicate map listings.

## Realistic routes to visibility

| Route | Concrete work | Measurement / dependency |
| --- | --- | --- |
| Technical indexing | Successful canonical HTTPS pages, proper404s, correct robots and hreflang, XML sitemap of usable translated pages; fix actual errors. | Search Console indexed pages and URL inspection. Discovery is not indexing. |
| Local listings (deferred) | Google Business work is cancelled by the user. Other directory work requires an explicit agreed scope. Website address/phone/hours remain consistent. | No new listing or duplicate profile created in this batch. |
| Specialty / service searches | A substantive page for each actual service: complaints, consultation process, available assessments, doctors, preparation, confirmed prices, questions and appointment route. | Relevant impressions, clicks and enquiries per service URL, by language. |
| Patient information | Original, useful articles grouped around our specialties; clinical sources, real author/reviewer when reviewed, current dates, natural internal links. | Queries and engaged visits to the articles; subsequent service visits/enquiries. |
| Internal discovery | Link services to related articles and doctors, and articles back to appropriate service/doctor pages; clear navigation and breadcrumbs. | Crawlable links, no orphan pages, verified translated links. |
| Trust / reputation | Actual clinician qualifications, licence and clinic identity; authentic patient reviews with consent and useful public replies. | Completeness and consistency of business information; genuine reviews. No invented ratings/testimonials. |
| Performance and mobile use | Measure representative mobile pages; fix slow critical images/scripts/layout instability and functional friction found in tests. | FieldCWV when available; distinguish browser/lab measurements from field data. No guarantee from one speed score. |
| Relevant references | Legitimate medical directories, real partner mentions and expert publications. Prepare accurate listings before submitting. | Quality/relevance of referring domains and resulting visits; no purchased-link scheme. |
| Conversion analytics | Search Console, an owner-controlled analytics property if available, phone/map/appointment events and successful lead submissions; no patient data in analytics events. | Enquiries, qualified appointments and source attribution, not just ranking. Analytics account/ID required before connecting one. |
| Paid acquisition | Optional Google Ads for approved active services, separate from organic ranking. | Approved budget and actual cost per qualified lead. No campaign or expenditure authorized by this SEO audit. |

## Priority query-to-page mapping

Search intents below are editorial targets, not measured-volume keyword research.

| Intent | Russian example | Uzbek example | Primary page / content support |
| --- | --- | --- | --- |
| Dermatologist / hair health | дерматолог в Ташкенте; выпадение волос | Toshkentda dermatolog; soch to‘kilishi | /ru/services/dermatology and /uz counterpart; acne article already published. Next: hair loss and skin-care questions. |
| Neurologist | невролог в Ташкенте; повторяющаяся головная боль | Toshkentda nevrolog; bosh og‘rig‘i | /services/neurology; future evidence-based headache guide. |
| Digestive concerns | гастроэнтеролог в Ташкенте; изжога | Toshkentda gastroenterolog; jig‘ildon qaynashi | /services/gastroenterology; future heartburn/consultation-preparation guides. |
| Orthopaedics | ортопед в Ташкенте; боль в колене | Toshkentda ortoped; tizza og‘rig‘i | /services/orthopedics; future knee/back consultation guides. |
| Ultrasound | УЗИ в Ташкенте | Toshkentda UTT | /services/ultrasound; actual available examinations and preparation information. |
| Night ENT | ЛОР круглосуточно Ташкент | Toshkentda LOR24/7 | /services/ent; clearly describe on-duty access versus the named doctor's schedule. |
| Night internist | терапевт ночью Ташкент | Toshkentda tungi terapevt | /services/therapy; same distinction about on-duty care. |
| Gynaecology | гинеколог в Ташкенте | Toshkentda ginekolog | /services/gynecology; confirmed consultation/doctor information. |
| Oncology | консультация онколога Ташкент | Toshkentda onkolog maslahati | /services/oncology; diagnosis review, second opinion and routing without treatment guarantees. |
| Check-up | deferred until launch | ishga tushguncha kechiktiriladi | Status page only; no fabricated packages or paid campaign. |

## Verified implementation and indexing status

Production verification on2026-11-19:

- Search Console root property: **/sitemap.xml Success,182 discovered URLs**. Re-submitted Russian map **/ru/sitemap.xml Success,37 discovered URLs**; its former fetch error is resolved.
- URL Inspection: /ru and /uz homepages and /ru/articles/acne-causes-care-treatment **indexed**. Russian dermatology page discovered but not yet indexed; request accepted into Google's priority crawl queue. Repeated submissions do not improve priority.
- Aggregate Pages report still processing. No claim that all182 URLs are indexed.
- HTTP audit of182 canonical sitemap URLs:200, title/description, exactly oneH1, matching canonical and HTML language, no noindex, valid JSON-LD and alternate targets. Reusable checker: scripts/audit-live-seo.py. This is not a ranking or Core Web Vitals measurement.
- Localized service search titles, Service and ProfilePage/Person structured data, related service/article/doctor links and transparent OG branding deployed.
- Owner-confirmed address and nuanced night-care hours published all5 locales. Check-up status page noindex; excluded from offers and sitemap until launch.
- All55 localized doctor profiles expanded to6–12 reasons to visit. Instagram embeds/map links verified.
- Dermatology, gastroenterology and ultrasound:5 original sections each in Russian/Uzbek, preserved existing text, relevant doctors and symptoms. Repeat enrichment dry-run0 changes.
- Acne article Russian/Uzbek:11 sections, sources and working outline. Two existing prevention articles expanded in Russian/Uzbek to7 sections each, approximately300–350 words; original practical explanations with sources. No invented clinician author/reviewer.

## Practical next priorities

Nov20 diagnostic update: Google URL Inspection confirms Russian home, oncology and inpatient pages are indexed. The24h Performance report shows8 impressions/2 clicks, including visible branded query `xon hospital` (6 impressions/2 clicks); no evidence of generic-query visibility yet. Default3-month report is lagging (chart endedNov17); Pages aggregate report still processing. Public audit of182 URLs again passed0 checked issues. Inpatient is a concrete content gap: its substantive text is only a short description, without admission/stay information. Obtain approved clinic facts and expand that page; indexed status alone is not competitive visibility. Do not interpret average position3.1 in this tiny sample as a generic-keyword ranking.

- **Google Business Profile work cancelled by the user.** Do not create or edit a listing. The website/indexing work proceeds independently.
- After Google populates Pages and Performance reports, evaluate actual excluded URLs, queries, clicks and languages; fix identified causes rather than repeatedly submitting every URL.
- Content: next develop researched hair-loss, heartburn and headache guides tied to real specialties. Use clinical sources and original explanations. Have a clinician review before labelling a page as reviewed; preserve editorial CMS changes.
- Add approved prices, clinic legal/licence information and reviewer details when supplied. Analytics connection is now explicitly requested; inspect the owner's existing GA4 setup before adding a tag. Measurement ID is public; never publish secret credentials.
- Measure mobile performance and field Core Web Vitals once data is available, and improve confirmed slow/unstable elements.
- Search-result layouts, favicon refreshes, sitelinks and business panels are selected by Google. No#1 guarantee, fixed indexing deadline or arbitrary article-count target.

## Primary Google references

- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Improve local business ranking](https://support.google.com/business/answer/7091)
- [ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Site names](https://developers.google.com/search/docs/appearance/site-names)
- [Favicon in results](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Sitelinks](https://developers.google.com/search/docs/appearance/sitelinks)
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
