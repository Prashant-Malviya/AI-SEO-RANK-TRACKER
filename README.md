# AI SEO Rank Tracker

AI SEO Rank Tracker is a MERN application for running AI-assisted SEO audits and tracking keyword rankings. The app combines React + Vite, Express, MongoDB, JWT authentication, Browserbase/Playwright scraping, and Google Gemini structured output.

## Architecture

```text
client/
  src/api              Axios API client with JWT injection
  src/context          Auth and theme context providers
  src/pages            Dashboard, SEO analysis, reports, history, rank tracking
  src/components       Shared UI components

server/
  controllers          Request handling and response contracts
  routes               Express route registration
  middleware           JWT authentication
  models               Mongoose schemas
  services             Gemini, Browserbase scraping, rank tracking
  cron                 Daily keyword refresh job
```

## Core Workflows

Authentication:
`React form -> /api/auth -> JWT -> protected routes -> MongoDB user`

SEO analysis:
`URL -> Browserbase Playwright scrape -> Gemini structured SEO audit -> Analysis model -> report UI`

Rank tracking:
`keyword + URL -> Google SERP scrape via Browserbase -> KeywordTracking model -> list/detail UI -> daily cron refresh`

## Setup

1. Install dependencies:

```bash
cd server && npm install
cd ../client && npm install
```

2. Create environment files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. Fill in `server/.env`:

```text
MONGODB_URI=...
JWT_SECRET=...
GEMINI_API_KEY=...
BROWSERBASE_API_KEY=...
```

The included Gemini and Browserbase keys, if any are present in local copies, should be treated as disposable sample credentials. Replace them with valid keys before verifying live AI or scraping behavior.

## Run Locally

Start the API:

```bash
cd server
npm start
```

Start the frontend:

```bash
cd client
npm run dev
```

The frontend defaults to `http://localhost:8080` for the API unless `VITE_BACKEND_URL` is set.

## API Summary

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/user`

SEO analysis:
- `POST /api/analysis/analyze`
- `GET /api/analysis/list`
- `GET /api/analysis/:id`
- `DELETE /api/analysis/:id`

Rank tracking:
- `POST /api/rank/add`
- `GET /api/rank/list`
- `GET /api/rank/:id`
- `POST /api/rank/:id/refresh`
- `PUT /api/rank/:id/toggle`
- `DELETE /api/rank/:id`

## Verification

Useful checks:

```bash
cd client && npm run build
cd server && node --check server.js
```

Live SEO analysis and rank tracking require valid `GEMINI_API_KEY` and `BROWSERBASE_API_KEY`. If those credentials are invalid, expired, or quota-limited, the app should fail gracefully and mark the affected analysis/tracking job as failed rather than crashing the server.
