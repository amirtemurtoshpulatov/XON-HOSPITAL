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
| Local Google / Yandex /2GIS | Find existing profile before creating one; verify owner; consistent name, address, phone, category and hours; real exterior/entrance photos, website link. | Calls, direction requests and website clicks from business profiles. Verification may require the owner. |
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

## Implementation status for this work batch

Already verified live before this new batch: sitemap accepted by Google with185 discovered URLs;187 URLs after publishing the ru/uz acne article; all11 doctor profiles expanded on five languages (55 pages),6–12 reasons per doctor; Instagram embeds and map link; transparent favicon assets accessible200; mobile article navigation and typography tested.

Current code batch awaiting deployment verification: localized service search titles, ProfilePage/Person and Service structured data, service→article→doctor links, consistent transparent OG logo, confirmed address/hours in CMS, explicit night-care notice, check-up status/noindex and exclusion from active offers/sitemaps. Expected sitemap after removing five check-up URLs:182.

Next content work: substantively improve existing service pages, beginning with dermatology, gastroenterology and ultrasound in ru/uz. Expand the existing short prevention guides, then publish the topic groups above after research. A large article count is not a substitute for useful, medically responsible pages.

## Practical rollout and review

- First: deploy and verify the current technical/business-fact corrections; inspect representative URLs and valid structured data.
- Next: verify the existing Google business listing and complete its information/photos/hours; collect licence/approved-pricing and clinician-review details.
- Content: small, researched groups tied to actual services; no arbitrary hundreds-of-articles quota or promised ranking deadline.
- Review progress from Search Console query/page/language data and actual enquiries; improve pages with impressions but low clicks, and useful pages Google excludes. Allow time for recrawling.
- Search-result layouts, favicon refreshes, sitelinks and business panels are selected by Google. There is no responsible#1 guarantee or exact layout toggle.

## Primary Google references

- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Improve local business ranking](https://support.google.com/business/answer/7091)
- [ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Site names](https://developers.google.com/search/docs/appearance/site-names)
- [Favicon in results](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Sitelinks](https://developers.google.com/search/docs/appearance/sitelinks)
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
