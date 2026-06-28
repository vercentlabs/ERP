# Local Development

This setup runs Vercent ERP against local PostgreSQL databases instead of in-memory module state.

## Quick Start

Windows PowerShell:

```powershell
copy .env.example .env
pnpm install
pnpm db:doctor
pnpm db:local:up
pnpm db:migrate:all
pnpm db:seed:dev
pnpm smoke:all
```

Docker Compose creates:

- PostgreSQL user/password: `vercent` / `vercent`
- control-plane database: `vercent_control_plane`
- tenant database: `vercent_tenant_dev`
- PostgreSQL container port: `5432`
- PostgreSQL host port: `5433` by default
- Redis host port: `6379`

## Environment

Use these defaults for local Docker:

```bash
POSTGRES_HOST_PORT=5433
CONTROL_PLANE_DATABASE_URL=postgresql://vercent:vercent@localhost:5433/vercent_control_plane
TENANT_DATABASE_URL=postgresql://vercent:vercent@localhost:5433/vercent_tenant_dev
DATABASE_URL=postgresql://vercent:vercent@localhost:5433/vercent_tenant_dev
REDIS_URL=redis://localhost:6379
API_PORT=4000
VERCENT_API_BASE_URL=http://localhost:4000
VERCENT_TENANT_ID=demo-tenant
ENABLE_DEV_AUTH=true
```

`TENANT_DATABASE_URL` is the primary tenant DB setting. `DATABASE_URL` remains as a fallback for runtime code.

## Doctor

Run:

```bash
pnpm db:doctor
```

The doctor checks Docker availability, ports `5432` and `5433`, active database URLs, database connectivity, the `vercent` role, required databases, and migration history.

Common messages:

- `Role vercent does not exist`: your `.env` is probably pointing at another PostgreSQL server, often on `localhost:5432`.
- `localhost:5433 is not open`: start Docker Desktop and run `pnpm db:local:up`.
- `migrations are pending`: run `pnpm db:migrate:all`.
- `history table is not present`: the database is fresh or migrations have not run.

## Local Database Commands

Start local services:

```bash
pnpm db:local:up
```

Stop local services:

```bash
pnpm db:local:down
```

Reset only the Vercent local Docker database:

```bash
pnpm db:local:reset
```

`db:local:reset` is destructive, but it is scoped to the `vercent-erp-local` Docker Compose project and refuses to run when `NODE_ENV=production`.

Manual fallback:

```bash
docker compose -p vercent-erp-local -f infrastructure/docker/compose.local.yml down -v --remove-orphans
docker compose -p vercent-erp-local -f infrastructure/docker/compose.local.yml up -d postgres redis
pnpm db:migrate:all
```

## Migrations And Seeds

Run all migrations:

```bash
pnpm db:migrate:all
```

Run only control-plane migrations:

```bash
pnpm db:migrate:control
```

Run only tenant migrations:

```bash
pnpm db:migrate:tenant
```

Seed minimal local development data:

```bash
pnpm db:seed:dev
```

## Smoke Tests

Run every implemented vertical slice:

```bash
pnpm smoke:all
```

This runs:

1. `db:doctor`
2. `db:migrate:all`
3. `db:seed:dev`
4. `smoke:crm-leads`
5. `smoke:master-data`
6. `smoke:lead-conversion`
7. `smoke:crm-opportunities`
8. `smoke:sales-quotations`
9. `smoke:sales-orders`

Individual smoke tests are also available with the same script names.

## API Health

Start the API:

```bash
pnpm --filter @vercent/api-service dev
```

Check process and database health:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/health/db
```

The DB health response includes `tenantDb`, `controlPlaneDb`, optional Redis status, and sanitized database host/port/database details.

## Troubleshooting

Docker Desktop not running:

- Start Docker Desktop.
- Run `pnpm db:local:up`.
- Run `pnpm db:doctor`.

Local PostgreSQL is using port `5432`:

- Keep Vercent Docker on `5433`.
- Keep `.env` URLs pointed at `localhost:5433`.

Role `vercent` is missing:

- You are likely connected to the wrong PostgreSQL server.
- Run `pnpm db:doctor`.
- If using Docker, run `pnpm db:local:reset`.

Wrong env file:

- Copy `.env.example` to `.env`.
- Confirm all three database URLs use `localhost:5433`.

Stale Docker volume:

- Run `pnpm db:local:reset`.

Switching host port:

- Set `POSTGRES_HOST_PORT` in `.env`.
- Update all database URLs to the same port.
- Restart Docker with `pnpm db:local:down` then `pnpm db:local:up`.
