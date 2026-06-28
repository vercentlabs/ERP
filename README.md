# Vercent ERP Platform

Vercent ERP is an AI-native business operating system for growing Indian companies.

This monorepo follows the documented platform plan in `docs/`: Next.js web apps, React Native mobile, Express services, PostgreSQL tenant databases, Redis queues, module-driven ERP domains, and AWS-ready infrastructure.

## Workspace

```txt
apps/          User-facing web, mobile, portal, and admin applications
services/      Runtime services for APIs, workers, realtime, billing, AI, files, and integrations
modules/       ERP domain modules using the standard module leaf pattern
packages/      Shared libraries for types, database, permissions, workflows, documents, and reporting
database/      Control-plane and tenant SQL migrations, seeds, views, functions, and RLS policies
infrastructure Docker, Kubernetes, Terraform, and AWS support files
scripts/       Migration, generation, deployment, backup, and devex automation
docs/          Product, architecture, module, API, security, and deployment documentation
```

## Local Development

```bash
pnpm install
copy .env.example .env
pnpm db:doctor
pnpm db:local:up
pnpm db:migrate:all
pnpm db:seed:dev
pnpm smoke:all
pnpm lint
pnpm test
pnpm build
```

The local Docker database uses `localhost:5433` by default to avoid conflicts with an existing PostgreSQL on `5432`. See `docs/deployment/local.md` for reset and troubleshooting commands.
