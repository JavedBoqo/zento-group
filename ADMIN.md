# Zento admin

## Editorial workspace

The admin uses the public website's blue and green brand palette with a shared responsive navigation, form and table design. Overview reports support 7, 30 and 90 day periods. Counts come from stored events and records; page views are visits, not unique visitors.

The blog writing canvas stores the existing version 1 structured content, never raw HTML. Choose Section heading for main sections and Subheading for their subsections. A section headed Quick summary becomes the summary; a section headed FAQs or Frequently asked questions uses its subheadings as questions and the following rich text as answers. Images use the existing Cloudinary upload. Optional special layout controls retain CTA variants, checklists and callouts. SEO defaults are generated when blank. Legacy articles require opening a visual copy before editing; original fields are retained and no migration runs automatically.

Career forms generate the reference and page address from a new title and derive the phone link from the contact number. Closed positions serve as drafts using the existing availability field. Private previews show the entered role information. Import tools remain available as a secondary workflow, with manual content pasting under an advanced disclosure. No new content schemas, tracking identifiers or AI services are introduced.

The public cookie notice waits until the stored choice is read, then appears only when consent is missing or preferences are explicitly opened. Both floating controls disappear after acceptance or rejection; Cookie Preferences in the footer reopens the card. The existing six-month first-party consent cookie and analytics gate are retained. The compact author byline shows the name, optional role, reading time and actual update date when available. No publication date is invented. The care advice/services sidebar is sticky below the desktop header, with scrolling only when it exceeds the viewport; it flows normally on mobile.

The admin lives in the existing Next.js application. Mongoose models, including the small `Media` upload registry, live in `models/`. The shared connection is in `lib/db.ts`, encrypted cookie sessions are in `lib/auth.ts`, and Route Handlers live in `app/api/admin/`. There is no separate API service or registration endpoint.

## Setup

1. Use Node.js 20.19 or newer. Copy the placeholders from `.env.example` into your existing `.env.local`. Keep the existing Resend and reCAPTCHA configuration. Use an authenticated MongoDB deployment with TLS and restricted network access in production.
2. Set `MONGODB_URI`, `APP_URL` (the exact browser origin), and a random `SESSION_SECRET` of at least 32 characters. Generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"`. Never commit the result.
3. Temporarily set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `.env.local`, then run `npm run admin:create`. Passwords must be at least 12 characters and at most 72 UTF-8 bytes. The script hashes with bcrypt and leaves existing accounts unchanged. Remove these three variables afterward.
4. Run `npm run migrate:content`. It validates the original blog blocks and job fields, creates unique slug indexes, and inserts missing records by slug. Rerunning never overwrites admin edits, drafts, or closed jobs. Keep `mock/blogs.json` and `mock/jobs.json`.
5. Set `CONTENT_SOURCE=mongodb`, then run `npm run dev`. Sign in at `/admin/login`. Before switching, the public pages keep reading JSON; admin changes do not affect that fallback.

## Routes

### Production login origin

Set `APP_URL=https://zentogroup.co.uk` in the production environment. If PM2 already has an old value, update its process environment too:

```sh
APP_URL=https://zentogroup.co.uk pm2 restart zento-group --update-env
pm2 save
```

Without `APP_URL`, production origin validation defaults to Zento's public HTTPS origin instead of the internal proxy URL. The apex and `www` HTTPS origins are accepted for Zento; other origins, missing origins, HTTP downgrades and spoofed forwarded headers remain rejected. An explicitly configured `APP_URL` takes precedence for other deployments. No CORS wildcard or disabled origin check is needed.

If login logs `MongoParseError: URI malformed`, check the credentials in `MONGODB_URI`: special characters must be percent-encoded (a literal `%` becomes `%25`). Encode the username/password components, not the entire URI, and avoid encoding an already encoded password again. If the URI parses but the system DNS resolver refuses Atlas SRV lookups, optionally set `MONGODB_DNS_SERVERS=1.1.1.1,8.8.8.8` in the affected environment. This changes Node's DNS resolver for the application process, not Windows network settings. Leave it unset when the default resolver works. Restart the development server after changing these settings. A working connection also requires `SESSION_SECRET` and an administrator created with `npm run admin:create` as described above.

| Area           | Routes                                                             |
| -------------- | ------------------------------------------------------------------ |
| Authentication | `/admin/login`                                                     |
| Overview       | `/admin/dashboard`                                                 |
| Blogs          | `/admin/blogs`, `/admin/blogs/new`, `/admin/blogs/[id]/edit`       |
| Careers        | `/admin/careers`, `/admin/careers/new`, `/admin/careers/[id]/edit` |
| Applicants     | `/admin/applicants`, `/admin/applicants/[id]`                      |
| Analytics      | `/admin/analytics`                                                 |

Every protected page and API checks the session against the current administrator record. Sessions expire after eight hours. Logout invalidates all of that admin's sessions. Changing the password hash or rotating `SESSION_SECRET` invalidates existing cookies. Use HTTPS in production; production cookies require it. Cookies are HttpOnly and SameSite=Strict. Mutations also check the request origin.

## Content and privacy

- Blog content retains the original `signs`, `text`, `text_with_list`, and `cta_section` blocks, FAQs, images and SEO fields. Text stays plain text as in the existing renderer. Images accept existing asset paths, HTTPS URLs or new Cloudinary uploads. Existing slugs are fixed to preserve links.
- Careers retain every existing JSON field and add `isOpen`. Only open jobs are public. Closing or deleting a job preserves historical applications. Application submission always checks the current database record, so run the content migration before accepting applications.
- Public pages and the sitemap are server rendered and revalidate every 60 seconds. Admin saves also invalidate the affected pages. Database failures in MongoDB mode do not silently republish JSON drafts or closed jobs.
- The existing application form and Resend notifications remain. Applications are saved before email delivery; retries of the same payload reuse the saved record. A successful application event means the application was saved, even if email notification subsequently failed. Email failures are shown to the applicant and can be retried. Saved applications remain available in admin.
- New CVs (PDF, DOC, DOCX; up to 5MB) use Cloudinary authenticated raw storage, with file signature checks. Existing private MongoDB GridFS CVs remain readable without migration. No public CV URL or local disk persistence is used. Download requires authentication and forces an attachment with no-store/noindex headers. Deleting an application deletes its CV. Treat documents as untrusted; signature checks are not antivirus scanning.
- Analytics collect page paths, allowlisted button actions, configured purposes and job slugs only after consent. No IP, referrer, query string, visitor/session identifier or form contents are stored in event records. The preference cookie lasts six months and can be changed through “Privacy choices”. Raw events expire after 90 days using a MongoDB TTL index. Dashboard dates use UTC. Counts are events, not unique visitors; clicks do not prove a call or email occurred.
- `trackEvent` in `lib/analytics.ts` is the single helper for additional tracking. Button/action values are allowlisted in `lib/admin-validation.ts`. Common phone, email, contact and job-apply links are tracked through one delegated click listener. Modal buttons declare their configured action.
- Rate limits use short-lived MongoDB counters, shared across application instances. Set `TRUST_PROXY=true` only if your ingress replaces `x-forwarded-for`. Otherwise limits apply globally: 30 login attempts, 20 applications, 600 analytics events per ten minutes; login also limits each email to eight attempts.
- Contact inquiries and their existing email flow are unchanged. No inquiry CRM was added.

## Visual article builder

Articles use visual fields for details, introduction, optional summary, sections, FAQs, CTA selection and SEO. Rich text supports paragraphs, bold, italic, safe links and lists. Sections can be collapsed, dragged or moved with arrow buttons, duplicated and removed. Blocks and FAQs have ordering controls. Existing Cloudinary uploads supply image previews and alt text. Preview creates a private 15-minute snapshot and opens a full-page, authenticated server-rendered view. It imports the exact public ArticleTemplate, under the same root fonts/styles and at the browser’s actual viewport width. It never publishes or updates the saved article.

New content is stored in optional `content` with `version: 1`, structured rich text, stable section/block/FAQ IDs, and a predefined CTA key. A shared Zod schema validates both Route Handler requests and the Mongoose content field. React renders allowed nodes and safe links; arbitrary HTML is never stored or rendered as markup. Excerpt and canonical URL are optional top-level fields. Drafts may be incomplete; publication checks titles, metadata, populated sections, FAQs and image descriptions. Newly created visual drafts may change their slug until first publication. Published and legacy URLs remain fixed, including after unpublishing.

### Legacy content and conversion

No bulk migration runs, and no existing database article is rewritten by this change. Records without versioned content use the previous renderer, including Markdown-source articles. Metadata and image edits can be saved without converting their body.

The explicit **Create visual version** action copies the persisted introduction, sections, list items, numbered items and FAQs in memory. It never infers section boundaries from `editorSource`. Unsupported fragments stay visible as text. Existing numbered/service layouts, icons and original closing CTA are retained. Review the copy using preview, then save when satisfied. Reopening a versioned article uses its stored IDs; conversion does not run again.

Original `intro`, `sections`, `faqs`, `closingCta` and `editorSource` fields remain stored unchanged alongside the visual copy. This retains a recovery source and conservatively retains its referenced images. Take a database backup before any future bulk migration. Such a migration must be opt-in, skip records already containing `content`, verify counts/IDs/content and media references, and compare previews before release. No bulk migration is needed to use this editor.

`CONTENT_SOURCE=mongodb` must be enabled for database articles to appear publicly. Existing auth, upload safety and media cleanup remain in use; structured image and icon references are included in cleanup checks.

## Deploy and maintain

Back up MongoDB, set production variables, create the admin, and migrate before enabling MongoDB content. Set `CONTENT_SOURCE=mongodb` before the production build; MongoDB must be reachable while public pages are generated. Run `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:integration`, and `npm run build`. Test login, private CV downloads, applications and consent in the deployment before routing production traffic. Run only one build or integration suite against a checkout at a time.

MongoDB must permit collection/index creation for the initial setup, including TTL indexes for analytics and rate counters. Use a least-privilege database account afterward. Back up and encrypt the database, including legacy GridFS data. Set a documented recruitment retention policy for your business and periodically delete applications through admin when no longer needed; no automatic applicant deletion schedule is imposed here. Email attachments also remain subject to your mailbox retention policy. Configure host-level request limits (6MB applications, 250KB admin JSON), TLS and trusted proxy headers.

The automated integration suite uses an ephemeral MongoDB database and a separate Next.js development port; it never uses the configured production database. Its MongoDB test binary is downloaded on first run. To use an installed MongoDB executable, set `MONGOMS_SYSTEM_BINARY` to the absolute path of `mongod` before running `npm run test:integration`.

## Verification — 28 October 2026

- Prettier check and TypeScript check pass. ESLint passes for the new admin code, database/auth modules and tests.
- `npm test`: 17 passing validation and email regression tests.
- `npm run test:integration`: 12 passing checks using real ephemeral MongoDB and HTTP requests to Next.js. These cover repeatable migration, authentication, login throttling, authorization, blog CRUD and draft privacy, public SEO/URLs, career CRUD, closed-job rejection, persisted applications, duplicate submissions, CV signatures, private downloads and deletion, analytics consent and aggregation, sitemap rendering and logout revocation. Email delivery and Cloudinary SDK network operations are mocked; existing Resend behavior is verified separately by the email regression tests. The media checks cover MIME/size/signature validation, shared and transformed image references, replacement/removal, failed-save retries, cleanup failures, abandoned uploads, authenticated Cloudinary CV downloads and legacy GridFS downloads.
- Production build passes with Webpack, matching the existing development command. Turbopack failed to start its CSS worker on this Windows environment.
- Browser checks covered login and dashboard, mobile menu, horizontally scrollable article tables and article editor layouts at desktop, 768px tablet and 390px mobile widths. No horizontal page overflow was observed.
- Repository-wide ESLint still reports the pre-existing `any` at `app/locations/edinburgh/page.tsx:569` and 66 existing warnings. Those unrelated website files were preserved.
- `npm audit` reports eight advisories in existing packages (including Nodemailer, PostCSS and their tooling dependencies); none is in the newly introduced admin runtime dependencies. These have not been automatically upgraded as part of this focused rebuild.

Production MongoDB credentials, the real admin account, live email delivery and deployment remain environment-specific setup steps. No production database was changed by these checks.

## Cloudinary media

Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in the server environment, using the placeholders in .env.example. No unsigned upload preset or public credential is needed. Restart the application after configuration changes.

- lib/cloudinary.ts contains the server-only SDK configuration. POST /api/admin/media accepts authenticated, same-origin JPEG, PNG and WebP uploads up to 5MB; both MIME type and file signatures are checked. Cloudinary also decodes uploaded image files.
- One ImageUpload component supplies upload, preview, replacement and removal controls for blog covers, block images, numbered-item icons, closing images and career adverts. Existing local paths and HTTPS URLs remain supported. Save the article/job to apply changes; saving is blocked while an upload is running.
- Existing Blog image src fields and Career image strings retain their original shape. The Media collection records each new asset's secure_url, public_id, resource type, delivery type and usage count. Cloudinary IDs are generated by the server and uploads never overwrite existing assets.
- New Applicant records save cvPublicId and cvSecureUrl. CVs are uploaded with resource_type=raw and type=authenticated. The saved delivery URL is unsigned and cannot be used for public access. The protected CV endpoint fetches a signed, 60-second Cloudinary API download server-side and returns an attachment with no-store/noindex headers. It never redirects to or exposes that signed URL. Existing GridFS CVs use the same authenticated download route.
- Replacements reserve the new image before changing content. Saves/deletes use version checks and release removed references afterward. Cleanup checks usage across blogs, careers and CV records, including transformed image URLs. Shared assets are retained. Only assets created and registered by this application can be destroyed; arbitrary existing URLs and public files are never deleted.
- Failed saves keep newly uploaded images available for retry. Failed deletions remain tracked. Deleted-asset tombstones prevent stale forms from reattaching an already removed URL.
- Run npm run media:cleanup periodically (for example daily on the host) to reclaim unattached or failed uploads older than 24 hours and retry cleanup failures. The command rechecks references before deletion. It retains metadata for deleted uploads. A process crash during a reserved save can conservatively retain an asset; review such records during maintenance rather than deleting potentially shared files.

No existing image URL is rewritten and no historical CV is automatically transferred. Keep legacy GridFS data until its applications have been deleted or a separate migration has been verified. Cloudinary must be configured before accepting new CV uploads. Automated tests stub Cloudinary network operations and use an isolated MongoDB database. A live smoke test also passed against the configured account: a synthetic PNG and authenticated PDF uploaded successfully, unsigned CV access returned HTTP 401, the signed server-side download matched the original bytes, and both test assets were deleted. No applicant data or production MongoDB records were used in that smoke test.

## Authors, clinical reviews and preview fidelity

Author profiles live in `models/Author.ts` and are managed at `/admin/authors`. Names, roles, photographs and biographies are entered by administrators; no profiles or credentials are invented or seeded in the real database. Inactive profiles cannot be newly assigned, while historical bylines retain their identity. Profile photographs use the existing Cloudinary upload registry and shared-media cleanup protections.

Blog relationships are optional `authorId` and `reviewerId`, plus `verificationStatus`. Publishing through the admin requires an existing author. A confirmed clinical review requires a different reviewer with supplied credentials and an explicit confirmation. The server records `reviewedAt` and `verifiedBy`; client-supplied timestamps are ignored. Editing article content clears the editor’s confirmation. The public header displays real attribution and review status rather than automatically claiming every article was written and verified by nursing specialists. Legacy records without profiles stay readable with neutral attribution.

The previous preview already imported ArticleTemplate but rendered it in a narrower dialog iframe through a client message receiver. That changed responsive breakpoints and content width relative to the published page. The new POST `/api/admin/blogs/preview` validates an unsaved draft and stores one short-lived snapshot per administrator. Only the token hash is stored. GET `/admin-preview/blog?token=…` requires the same authenticated administrator and a non-expired snapshot; it server-renders ArticleTemplate and resolves author data using the same resolver as the public page. Responses are private/no-store and noindex. No independent preview CSS or article renderer is maintained.

### Public content source

The existing `CONTENT_SOURCE` setting is intentionally preserved. JSON mode serves the legacy public site, while admin drafts live in MongoDB. Publishing a database record does not change that setting. The editor exposes this configuration in Publishing & SEO rather than claiming the JSON website has changed. To enable CMS publishing, back up the database, run the existing idempotent `npm run migrate:content` (which inserts missing legacy articles and careers without overwriting existing records), verify legacy slugs and images, then set `CONTENT_SOURCE=mongodb` for build/runtime and restart. No migration, configuration switch, commit or deployment is run automatically by the editor changes.

### Typed article sections

Structured content version 1 now supports `content`, `cta` and `checklist` section types. Existing sections without a type and the existing `layout: service` representation retain their original renderer. Common `id`, `title`, `layout` and `blocks` fields are preserved; CTA sections add the blue variant and typed actions, while checklists add ordered items with stable IDs and formatted inline content. The same Zod schema validates Route Handler payloads and Mongoose content. Links require safe local paths or HTTPS URLs; telephone actions require `tel:` numbers. Consultation and contact actions open the existing Zento forms. Incomplete drafts are allowed; publishing requires section content, titles, button labels and complete checklist items.

Add section offers the three types. The section type dropdown is the explicit manual conversion path: titles, IDs, rich text and image blocks are retained. Checklist items become a normal list when changing type, and removing CTA actions requires confirmation. Ordinary section titles never trigger conversion. No stored article is automatically migrated or rewritten; reverting an unsaved conversion is as simple as leaving without saving.

`StructuredSection` delegates blue panels to `CtaSectionBlock` and checklists to `TextWithListSection`; both authenticated draft preview and public articles use that renderer. The inline CTA sample reuses it with inactive actions. The green closing banner remains the single existing template slot, controlled by the existing final-CTA preset (`original`, `consultation`, `support`, `none`); adding blue sections never adds another final banner. FAQs and table-of-contents IDs are unchanged.

## JSON import and AI prompts

Blog Articles now links to `/admin/blogs/import` for JSON import and the fixed AI conversion prompt. Upload a `.json` file or paste an article object, an array of articles, or `{ "articles": [...] }`. Choose Validate JSON before importing. Validation is read-only. Imports are create-only, bounded to 20 articles and 1 MB per batch (200,000 characters per article). Per-article results show errors, slug conflicts and links to the existing visual editor. Conflicts never overwrite records; use the link to explicitly edit the existing article, or choose a different imported slug. A mixed batch imports only its ready articles, and reports any save failures individually.

The actual article contract remains `blogInput` in `lib/admin-validation.ts`, with versioned structured content in `lib/article-content.ts`. `lib/blog-import-contract.ts` supplies wrapper normalization and defaults, not another storage model. `lib/blog-import.ts` performs backend validation, existing-author checks, conflict checks and persistence. Both import and ordinary article creation use `lib/blog-write.ts`, including existing media reservations and rollback. Authentication, same-origin protection and server validation apply to the import Route Handler. Arbitrary properties are not persisted.

Imports default to draft even if input JSON says published. The explicit Publish immediately checkbox requires a valid active author and complete publication fields. Imported author/reviewer IDs must resolve to existing profiles; no identities or credentials are created. Clinical review always resets to unverified on import and must be confirmed separately in the editor. Publication dates are not an editable feature of the current article contract; MongoDB timestamps continue to be server-managed.

Legacy JSON using `intro`, `sections` and `faqs` is converted in memory using its existing section boundaries and saved in the same Blog record as structured visual content. Known legacy CTA sections become explicit blue CTAs. Slugs, source fields, SEO and image references are retained. No existing articles are automatically migrated or rewritten. Native JSON should use `content.version: 1`, structured sections and FAQs, with the legacy arrays empty. Use `content.summary` for the Quick Summary; empty summaries remain intentionally hidden. Cards prioritize the summary, with Excerpt as a fallback. The existing final green CTA is controlled by `content.cta`, rather than inserted as another section.

The AI Prompt area keeps Copy Prompt visible and displays the fixed conversion prompt in a collapsed View conversion prompt panel. The panel uses selectable, non-editable preformatted text, not a textarea. There are no topic/audience/keyword/count fields and no generation action. Administrators copy it into ChatGPT, Claude or Gemini and supply their existing blog content separately. The prompt requires preserving meaning, section structure and factual claims without inventing information, and JSON-only output with an articles wrapper for multiple blogs. The shared BLOG_JSON_CONVERSION_PROMPT constant lives beside the importer contract in lib/blog-import-contract.ts; it has no AI API integration. Its JSON Schema is generated directly from `blogInput` using Zod, and its example is parsed by that same contract. It explains rich text, typed sections, safe CTA actions, author references, SEO, images and multi-article wrappers. Review all external AI output before publishing. Working reference files are `examples/blog-import.json` and `examples/blog-import.schema.json`; the import page also offers the validated example as a download. Custom URL refinements and publish-time requirements are enforced by the application beyond the exported JSON Schema.

Public rendering restores icon-based unordered lists, subsection dividers, compact callouts, the original green consultation wording and a compact author row with name initials when no photo exists. Editor rich text uses matching list icons and heading dividers. Sidebar height restrictions apply only on desktop, with a visible scrollbar; mobile content flows normally. Preview continues to share `ArticleTemplate`. Development output is isolated in `.next-dev`, while production uses `.next`, so a production build cannot remove a running development server's cache. Test preview servers keep their existing `NEXT_TEST_DIST_DIR` override.

Files involved in this refinement:

- Import UI and navigation: `components/admin/BlogImport.tsx`, `app/admin/(panel)/blogs/import/page.tsx`, `app/admin/(panel)/blogs/page.tsx`.
- Shared import contract and persistence: `lib/blog-import-contract.ts`, `lib/blog-import.ts`, `lib/blog-write.ts`, `app/api/admin/blogs/import/route.ts`, `app/api/admin/blogs/route.ts`.
- Public article styling: `components/blog/ArticleTemplate.tsx`, `RichTextView.tsx`, `StructuredSection.tsx`, `AuthorAttribution.tsx`, `BlogSidebar.tsx` in the same directory, and `lib/article-editor.ts` for the closing preset.
- Editor consistency and accordion stability: `components/admin/BlogEditor.tsx`, `ArticleSections.tsx`, `SectionTypeFields.tsx`, `BuilderActions.tsx` and `blog-builder.css` in the same directory.
- Development-cache isolation: `next.config.ts`, `.gitignore` and Next-managed TypeScript includes in `tsconfig.json`.
- Reference and verification: `examples/blog-import.json`, `examples/blog-import.schema.json`, `tests/article-builder.test.ts`, `tests/admin-integration.test.mjs`, and this guide.

The author form no longer includes Relevant qualifications or its credentials hint. Existing stored qualifications are retained when editing and saving profiles. The clinical reviewer checkbox is shown only for profiles with existing reviewer eligibility data; new author profiles do not expose an unusable credentials-dependent checkbox. Existing clinical-review validation is unchanged.

## Career JSON import

Careers now links to `/admin/careers/import`, with the same shared import UI as blogs (`components/admin/JSONImport.tsx`). Copy the fixed career conversion prompt, supply existing job descriptions separately to an external AI tool, then upload a `.json` file or paste the result. The prompt is collapsed and non-editable; no AI API is called. Both the prompt's JSON Schema and its valid example come from the existing `careerInput` contract. Downloadable references are `examples/career-import.json` and `examples/career-import.schema.json`.

Accepted input is one complete position, an array, `{ "jobs": [...] }`, or `{ "careers": [...] }`. Validate JSON is read-only. Batches are bounded to 20 positions and 1 MB total, with 200,000 characters per position. Unknown fields, malformed email/phone/image fields, invalid salary ranges and duplicate IDs/slugs produce per-position errors. Existing records are never overwritten; conflict results link to the existing career editor for an explicit update.

Imports default to `isOpen: false`, even if the input says true. The explicit Open positions immediately checkbox allows opening positions during import. Otherwise review and open the imported position through the current career editor. There is no new draft/status field, content model or database collection. Public rendering and applicant handling are unchanged. As before, public MongoDB-backed careers require `CONTENT_SOURCE=mongodb`.

`lib/career-import-contract.ts` normalizes wrappers and validates against the existing schema; `lib/career-import.ts` performs bounded create-only imports; `lib/career-write.ts` shares the existing media reservation/rollback path with normal career creation. The authenticated, same-origin Route Handler is `app/api/admin/careers/import/route.ts`. Tests cover career wrappers and prompt/UI consistency in `tests/career-import.test.ts`, and the isolated HTTP workflow in `tests/admin-integration.test.mjs`.
