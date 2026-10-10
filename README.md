# Vinod Kumar Upadhyay — official website

Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion. Hindi (`/hi`, the default) and English (`/en`).
The structure, navigation and colours follow jagatprakashnadda.in; every word and photograph is Vinod's.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and fill it in. Without the Gmail variables the enquiry form
only logs in development and returns an error in production. Without `GROQ_API_KEY` the
"Ask assistant" chat says it is unavailable; the rest of the site is unaffected.

Judge speed on a production build (`npm run build && npm start`), not on `npm run dev`.

## Where content lives

All copy is in `src/content/`, each string as `{ en, hi }`. Pages read from these files; nothing is
hard-coded in components.

| File | What it holds |
|---|---|
| `profile.ts` | His verified facts: quick facts, biography, responsibilities, vision |
| `journey.ts` | Responsibilities, four turning points, and the ten journey steps |
| `publicLife.ts` | Development work, social service, environment, public connect |
| `media.ts` | Photos. `group: "meeting"` puts a photo under Media → Meetings & Interactions |
| `updates.ts` | Events. Each event's photos also form an album in Media → Gallery |
| `heroSlides.ts` | The two home-page hero slides |
| `ui.ts` | Interface strings, navigation labels, form text |
| `legal.ts` | Privacy and Terms text |
| `seo.ts` | Page titles and descriptions for search results |

Name, role, social links and the YouTube channel: `src/lib/site.ts`.

Source for all content: the client brief and *Vinod ji Biodata.pdf*. Private details in the biodata
(date of birth, parents' names, home address, phone, email) are deliberately not published. The biodata
gives no dates, project names, villages or news items, so none are shown; nothing has been invented.

## Adding material

- **Photos or videos:** put files under `public/images/...` and add an entry to `media.ts` with
  alt text and caption. Category filters appear automatically once more than one category has items.
  A video with `featured: true` also appears as the featured video on the home page.
- **An update:** add an entry to `updates.ts`. The nav item, home section, list page, detail page,
  sitemap and Article structured data switch on by themselves.
- **Website assistant:** `src/app/api/assistant/route.ts` answers only from the content files above
  (see `src/lib/assistant.ts`), so it stays in step with the pages.
- **Latest YouTube videos:** the home page reads the channel live. `node scripts/update-youtube-snapshot.mjs`
  refreshes the saved fallback list in `src/content/youtubeSnapshot.ts`.

## Before launch

- Set `NEXT_PUBLIC_SITE_URL` to the real domain (until then a production build uses `https://www.example.com`).
- Set the three Gmail variables so the enquiry form delivers mail.
- Privacy and Terms pages exist at `/privacy` and `/terms` but are not linked from the footer (as on the
  reference site). Link them and have them reviewed, since the form collects a mobile number.
