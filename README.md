# Niagara Indian Association

Community website for the Niagara Indian Association (NIA), featuring events, leadership, membership information, photos, videos, sponsors, and a contact form.

Repository: https://github.com/niagaraindians-hue/NiagaraIndiansAssociation

## Technology and requirements

- Next.js 16.3.0 (App Router), React 19.2.8, and TypeScript
- Tailwind CSS 4, Framer Motion, and Lucide/React Icons
- Resend for server-side contact email delivery
- Node.js 20.9.0 or newer, npm, and Git. Use a supported Node.js release meeting that minimum.

## Local setup

```bash
git clone https://github.com/niagaraindians-hue/NiagaraIndiansAssociation.git
cd NiagaraIndiansAssociation
npm ci
```

Create `.env.local` in the project root using the settings below, then run:

```bash
npm run dev
```

Open http://localhost:3000. Source changes appear automatically. Restart the server after changing environment variables. To use another port, run `npm run dev -- --port 3001`.

## Environment variables

Create your own `.env.local`; this file is excluded from Git. Replace these placeholders with your configuration:

```dotenv
RESEND_API_KEY=replace_with_your_resend_api_key
CONTACT_TO_EMAIL=info@niagaraindians.com
CONTACT_FROM_EMAIL="NIA Website <website@your-verified-domain.example>"
```

| Variable | Purpose | Default if omitted |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend API key for contact email | None |
| `CONTACT_TO_EMAIL` | Recipient for contact submissions | `info@niagaraindians.com` |
| `CONTACT_FROM_EMAIL` | Sender identity | `NIA Website <onboarding@resend.dev>` |

Use a sender authorized by your Resend account for production. The built-in sender is a development fallback. Configure the same variables in your hosting environment. The Resend client is constructed when the contact route loads, so a missing key can prevent route initialization as well as email delivery.

Keep keys server-side: do not prefix them with `NEXT_PUBLIC_` or commit `.env.local`. The current application reads only the three environment variables above. The chatbot does not require an OpenAI API key.

## Commands and verification

| Command | Purpose |
| --- | --- |
| `npm ci` | Install dependencies from the committed lockfile |
| `npm run dev` | Start development server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Check TypeScript |
| `npm run build` | Create production build |
| `npm start` | Serve an existing production build |

Before submitting application changes, run lint, type checking, and a production build. There is currently no automated test script or committed test suite, although Playwright is installed as a development dependency.

Manually check desktop/mobile navigation, event details, gallery dialogs, video playback, membership links, and contact validation. A successful contact test sends real email; configure a test recipient during development.

## Pages and project structure

| Route | Purpose |
| --- | --- |
| `/` | Home page with events, community portal, media, sponsors, newsletter, and chat |
| `/about` | Association information and leadership |
| `/events` | Event listing |
| `/events/[id]` | Details for an event from `data/events.ts` |
| `/gallery` | Photo and video gallery |
| `/membership` | Membership information and external registration |
| `/contact` | Contact details and email form |
| `POST /api/contact` | Contact validation and email delivery |

```text
app/                 Pages, layout, global styles, and API routes
components/          Feature sections, navigation, footer, and reusable UI
data/                Event and leadership content
types/               Shared TypeScript types
public/              Public images and static assets
next.config.ts       Next.js and image configuration
eslint.config.mjs    ESLint configuration
```

No database or CMS is configured. Content is maintained in source files.

## Updating content

| Content | Files |
| --- | --- |
| Home page section order | `app/page.tsx` |
| Site title and description | `app/layout.tsx` |
| Global styles | `app/globals.css` |
| Events | `data/events.ts` |
| Leadership | `data/leadership.ts`, `components/about/LeadershipSection.tsx` |
| Gallery | `components/gallery/GallerySection.tsx` |
| Home page media | `components/media/MediaShowcase.tsx` |
| Sponsors and partners | `components/sponsors/SponsorsSection.tsx` |
| Membership information | `app/membership/page.tsx` |
| Navigation and footer | `components/navbar/Navbar.tsx`, `components/footer/Footer.tsx` |
| Contact form and email | `app/contact/page.tsx`, `app/api/contact/route.ts` |
| Chat responses | `components/chatbot/ChatBubble.tsx` |

Follow existing event record structure and use unique IDs for detail URLs. Check date-driven event status on listing and detail pages. Membership and community portal URLs occur in multiple components; search for all copies when changing them.

Place images under `public/images/` and reference them as `/images/...`. Match filename capitalization exactly for case-sensitive deployment systems and provide meaningful alternative text. External images rendered through `next/image` need a matching `images.remotePatterns` entry in `next.config.ts`; the current list is empty.

### Video assets

`.gitignore` excludes `*.mp4` and the entire `public/images/videos/` directory. A fresh clone does not provide all locally referenced videos and thumbnails. Current references include:

- `/images/videos/Inaugration.mp4`
- `/images/videos/CulturalDance.mp4`
- `/images/videos/Inaugration.jpg`

Preserve these exact spellings when supplying files. Provide these assets separately for local use and deployment, or host them externally and update both gallery and home media components. Ignored files are not uploaded by Git push. Git LFS is not configured in this repository.

## Current integration behavior

- **Contact:** sends to `/api/contact` using Resend. Name, email, subject, and message are required; phone is optional. The endpoint checks email format and field lengths, escapes HTML, and sets the submitter as reply-to. Responses are `200` for success, `400` for validation failures, and `500` for service/server failures.
- **Newsletter:** displays a local success state only; it does not store email addresses or subscribe users to a mailing list.
- **Chat assistant:** uses predefined browser-side responses; it does not call an AI service or persist conversations.
- **Membership:** registration links lead to Zeffy; payment processing is external.
- **Community portal:** links to `https://app.niagaraindians.com/`, which is maintained separately.

## Production deployment

Use hosting that supports Next.js server features, such as a Node.js server or a compatible managed Next.js platform. The contact API requires a server runtime; plain static hosting cannot provide it.

1. Connect this repository and choose `main` as the deployment branch.
2. Set the application directory to the repository root.
3. Configure a compatible Node.js version and the three environment variables above.
4. Install with `npm ci` and build with `npm run build`.
5. For a Node.js server, run `npm start`. Managed platforms may handle startup automatically.
6. Supply excluded video assets or update hosted media URLs.
7. Verify deployed pages, media, external links, and contact email delivery.

To check production behavior locally:

```bash
npm run build
npm start
```

## Git workflow

The primary remote is `origin`, pointing to this repository. Check configuration with `git remote -v` and `git status`.

Start a change from an up-to-date main branch:

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/describe-your-change
```

After editing and verifying, stage the intended files, commit, and push. For example:

```bash
git add README.md
git commit -m "docs: update project instructions"
git push -u origin feature/describe-your-change
```

Replace the filename and branch with those relevant to your change, then open a pull request into `main`. An existing clone does not need `git init` again.

If a push fails with `403`, confirm the authenticated GitHub account has write access and has accepted its collaborator invitation. On Windows with Git Credential Manager, refresh authentication with:

```bash
git credential-manager github login --browser --force
```

Then retry the push. Changing `git config user.name` changes commit authorship, not authentication.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Contact request fails | Resend key, authorized sender, recipient, and server logs; restart after environment changes |
| Video or thumbnail returns 404 | Supply excluded assets separately and verify path spelling |
| Image fails only after deployment | Filename capitalization and external image configuration |
| Port 3000 is busy | Run `npm run dev -- --port 3001` |
| Newsletter succeeds without a subscription | Mailing-list integration is not implemented |
| Chat gives generic responses | Responses are predefined in the chatbot component |

## Coding assistant instructions

Read `AGENTS.md` before changing code. This project uses a Next.js version whose conventions may differ from older releases. Consult the relevant bundled guide in `node_modules/next/dist/docs/` after installing dependencies. `CLAUDE.md` also points to `AGENTS.md`.
