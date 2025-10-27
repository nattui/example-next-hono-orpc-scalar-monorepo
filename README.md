### Experiment: Next.js + Hono (Bun) + Turborepo

A minimal monorepo demonstrating a typed full‑stack setup:
- **Web app**: Next.js 16 (React 19) with Tailwind CSS v4 and `@nattui` UI
- **API**: Hono on Bun with oRPC, auto‑generated OpenAPI and live API docs
- **DB**: Drizzle ORM on Postgres with schema, migrations, and seeding
- **Monorepo**: Turborepo, Biome for formatting/linting

## Structure
- `apps/api`: Hono + oRPC server (Bun), OpenAPI generator, Scalar API reference
- `apps/web`: Next.js app, calls API via oRPC client + Next rewrites
- `packages/db`: Drizzle ORM schema, migrations, seed utilities
- `scripts`: repo utilities (clean, sort package.json)

## Quickstart
1) Install dependencies (workspace-aware)
```bash
bun install
```

2) Start Postgres (example via Docker)
```bash
docker run --name exp-next-hono-pg -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=experiment \
  -p 5432:5432 -d postgres:16-alpine
```

3) Create environment files
- `apps/api/.env`
```env
# Required
JWT_SECRET=replace-with-a-long-random-string
DATABASE_URL=postgres://postgres:postgres@localhost:5432/experiment
```
- `apps/web/.env`
```env
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXT_PUBLIC_WEB_URL=http://localhost:3001
```

4) Prepare database (Drizzle)
```bash
# from repo root
bun --cwd packages/db run db:generate
bun --cwd packages/db run db:migrate
bun --cwd packages/db run db:seed
```

5) Run all apps in dev
```bash
bun run dev
```
- Web: http://localhost:3001
- API: http://localhost:3002
- API Docs (Scalar): http://localhost:3002/docs
- OpenAPI JSON: http://localhost:3002/openapi.json

## Scripts
Root (Turborepo)
- `bun run dev`: run all dev servers (no cache, persistent)
- `bun run build`: build all packages/apps
- `bun run start`: start all apps (`web` on port 3001; `api` on 3002)
- `bun run check`: Biome check
- `bun run check:fix`: Biome fix (unsafe)
- `bun run check:type`: type check via Turborepo
- `bun run clean`: repo clean
- `bun run update`: update deps (recursive)

apps/api
- `bun run dev`: Hono dev server on port 3002
- `bun run build`: typecheck + bundle via tsdown

apps/web
- `bun run dev`: Next dev on port 3001
- `bun run build`: `next build`

packages/db
- `bun run db:generate`: generate SQL from schema
- `bun run db:push`: apply schema (safe for dev)
- `bun run db:migrate`: run migrations
- `bun run db:seed`: seed sample data
- `bun run db:studio`: Drizzle Studio

## Configuration and Environment
- `DATABASE_URL` (required): Postgres connection used by the `db` package (and thus by the API). Must be present when running the API.
- `JWT_SECRET` (required): used by Hono for signing sessions (HS256).
- `NEXT_PUBLIC_API_URL`: host for the API, used by `next.config.ts` rewrites.
- `NEXT_PUBLIC_WEB_URL`: host for the web app, used by the oRPC client base URL.

Next.js rewrites (in `apps/web/next.config.ts`) forward `/api/:path*` to `${NEXT_PUBLIC_API_URL}/:path*`. The web app calls the API only through `/api/...` so changing those envs is enough to point to remote/staging APIs.

## API Overview
The API is defined with oRPC and auto‑documented.
- Auth
  - `POST /api/auth/signup/credential` → create user, set `session` cookie
  - `POST /api/auth/signin/credential` → authenticate, set `session` cookie
  - `POST /api/auth/signout` → delete `session` cookie
  - `GET /api/auth/verify?session=...` → boolean
- Main
  - `GET /api/health` → hello string
  - `GET /api/users` → list users

API docs (Scalar): http://localhost:3002/docs

## Web Overview
- Authentication status is read server‑side via `cookies()` and validated with `client.auth.verify`.
- Example pages: `/`, `/signin`, `/signup`, `/health`.
- After sign‑in/sign‑up the page refreshes to reflect auth state.
