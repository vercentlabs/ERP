# Vercent ERP Tech Stack

This document captures the final recommended technology stack for Vercent ERP: a SaaS ERP platform covering CRM, sales, procurement, inventory, finance, manufacturing, HR, payroll, projects, helpdesk, AI, analytics, portals, automation, and multi-tenant SaaS operations.

The current foundation already aligns with this direction: pnpm, Turbo, Next.js, Express, PostgreSQL, Redis, BullMQ, Socket.IO, Docker, Kubernetes, Terraform, and shared packages.

## 1. Monorepo and Build System

Use this stack to manage all apps, services, modules, and packages in one enterprise monorepo:

```txt
pnpm
Turbo
TypeScript
ESLint
Prettier
Knip
```

Recommended setup:

```txt
pnpm workspaces
Turbo remote caching later
TypeScript strict mode
Shared tsconfig.base.json
Shared ESLint config
Shared Prettier config
```

## 2. Frontend Web App

Main ERP web application:

```txt
Next.js
React
TypeScript
Tailwind CSS
Material UI / MUI
Emotion
Axios
React Hook Form
Zod
TanStack Table
TanStack Query
Recharts / ECharts
```

Recommended app:

```txt
apps/web
```

Use this for:

```txt
ERP dashboard
CRM
Sales
Procurement
Inventory
Finance
Manufacturing
HR
Payroll
Projects
Helpdesk
Analytics
AI assistant
Settings
Extension studio
```

Recommended frontend stack:

```txt
Next.js App Router
React Server Components where useful
Client components for ERP screens
MUI for enterprise components
Tailwind for layout/utilities
Zod for form validation
React Hook Form for complex forms
TanStack Query for API data fetching
TanStack Table for data grids
Recharts or Apache ECharts for dashboards
```

## 3. Mobile App

Mobile supports sales reps, warehouse staff, field service, HR attendance, approvals, and offline work:

```txt
React Native
Expo
TypeScript
React Navigation
NativeWind
AsyncStorage
Expo Secure Store
React Native Reanimated
React Native Gesture Handler
React Native Vector Icons
```

Recommended app:

```txt
apps/mobile
```

Use mobile for:

```txt
Lead management
Customer visits
Inventory scanning
Warehouse picking
Field service dispatch
Attendance
Approvals
Push notifications
Offline sync
```

## 4. Public and Portal Apps

External users should have separate frontend apps:

```txt
Next.js
React
TypeScript
Tailwind CSS
MUI
```

Apps:

```txt
apps/landing
apps/customer-portal
apps/supplier-portal
apps/employee-portal
apps/partner-portal
apps/developer-portal
apps/admin-console
apps/extension-studio
```

Purpose:

```txt
landing              -> marketing website
customer-portal      -> invoices, orders, tickets, payments
supplier-portal      -> RFQs, POs, bills, supplier scorecards
employee-portal      -> attendance, leave, payslips, expenses
partner-portal       -> resellers, channel partners
developer-portal     -> API docs, webhooks, SDKs
admin-console        -> SaaS admin, tenants, plans, billing
extension-studio     -> low-code customization builder
```

## 5. Backend Runtime

Main backend API:

```txt
Node.js 20+
Express.js
TypeScript
Zod
Knex.js
pg
JWT
bcrypt
Helmet
CORS
Multer
Nodemailer
Socket.IO
BullMQ
Redis
```

Recommended services:

```txt
services/api
services/control-plane
services/workers
services/realtime
services/billing
services/metering
services/automation
services/integrations
services/files
services/search
services/ai
services/data-platform
services/extension-runtime
services/master-data
```

Backend module pattern:

```txt
routes.ts
controller.ts
service.ts
repository.ts
schemas.ts
permissions.ts
events.ts
workflows/
jobs/
reports/
integrations/
tests/
```

## 6. Database

Primary database:

```txt
PostgreSQL
Knex.js
pg
SQL-first migrations
```

Recommended database design:

```txt
Control-plane database
Tenant databases
Tenant schemas
Row-level security where needed
Database views
Database functions
Audit tables
Event store
Outbox table
```

Use PostgreSQL for:

```txt
ERP transactional data
Accounting ledgers
Inventory ledgers
HR/payroll
Manufacturing
Tenancy
Audit logs
Workflow states
Reports
```

PostgreSQL extensions to consider:

```txt
uuid-ossp or pgcrypto
citext
pg_trgm
btree_gin
btree_gist
unaccent
```

Optional later:

```txt
TimescaleDB for time-series metrics
PostGIS for logistics/field service routing
```

## 7. Cache, Queues, and Realtime

```txt
Redis
BullMQ
Socket.IO
Socket.IO Redis Adapter
```

Use Redis for:

```txt
Session-like cache
Tenant config cache
Rate limiting
Queue backend
Realtime adapter
Temporary workflow state
Feature flag cache
```

Use BullMQ for:

```txt
Email jobs
Notification jobs
Payroll runs
Inventory recalculation
Financial posting
Report generation
Import/export
AI background processing
Webhook delivery
Subscription billing
Backup verification
```

Use Socket.IO for:

```txt
Realtime notifications
Live dashboards
Approval updates
Ticket updates
Chat/support
Inventory changes
Job progress
```

## 8. File Storage and Documents

```txt
AWS S3
Multer
Signed URLs
Virus scanning service
Document preview service
```

Use for:

```txt
Invoices
Purchase orders
Payslips
Employee documents
Contracts
Attachments
Product images
Support ticket files
Compliance documents
```

Recommended later:

```txt
ClamAV for virus scanning
PDF generation service
Document template engine
OCR/document intelligence
```

## 9. Authentication and Security

```txt
JWT
bcrypt
Helmet
CORS
Rate limiting
RBAC
ABAC
Row-level security
Audit logs
Field-level permissions
Encrypted secrets
```

Recommended security stack:

```txt
jsonwebtoken
bcrypt
helmet
cors
express-rate-limit or Redis-based rate limiter
Zod validation
Input sanitization
Field encryption utilities
Audit event store
Permission policy engine
```

Security features:

```txt
Multi-tenant auth
Organization scope
Company scope
Branch scope
Role permissions
Attribute-based access
Approval authority matrix
Segregation of duties
Sensitive field masking
Audit logs
API key management
OAuth integrations
```

## 10. SaaS Platform Stack

For SaaS business operations:

```txt
Tenant control plane
Plan entitlements
Subscription billing
Usage metering
Quota enforcement
Feature flags
Tenant provisioning
Tenant suspension
Tenant backup/restore
```

Recommended services:

```txt
services/control-plane
services/billing
services/metering
```

Recommended capabilities:

```txt
Tenant database provisioning
Plan limits
Seat limits
Storage limits
API usage limits
Module entitlements
Billing lifecycle
Trial lifecycle
Usage events
Invoices
Dunning
```

Payment gateway options:

```txt
Stripe
Razorpay
Cashfree
Paddle
```

For India-first SaaS, consider:

```txt
Razorpay
Cashfree
Stripe India where applicable
```

## 11. ERP Module Runtime

Core ERP domain modules:

```txt
modules/platform
modules/master-data
modules/crm
modules/sales
modules/procurement
modules/inventory
modules/warehouse
modules/logistics
modules/finance
modules/enterprise-performance
modules/manufacturing
modules/quality
modules/maintenance
modules/product-lifecycle
modules/hr
modules/payroll
modules/projects
modules/helpdesk
modules/field-service
modules/commerce
modules/subscriptions
modules/compliance
modules/risk-management
modules/sustainability
modules/analytics
modules/ai
modules/extension-studio
modules/industry-packs
modules/data-platform
modules/integration-marketplace
```

Each module should use:

```txt
TypeScript
Express routes
Zod schemas
Knex repositories
Domain services
Workflow definitions
Permission definitions
Event definitions
Report definitions
Tests
```

## 12. Analytics and Reporting

```txt
PostgreSQL views
Materialized views
Reporting engine package
Scheduled reports
CSV/XLSX export
PDF export
Dashboard builder
Report builder
```

Recommended libraries:

```txt
exceljs or xlsx
pdfkit or puppeteer for PDF generation
Recharts / ECharts for frontend charts
TanStack Table for report grids
```

Optional future:

```txt
ClickHouse
DuckDB
BigQuery
Redshift
Apache Superset
Metabase embedded
```

For now, PostgreSQL views and materialized views are enough.

## 13. AI Stack

Start simple and modular:

```txt
services/ai
modules/ai
AI gateway
Agent orchestration
Document intelligence
Forecasting agents
Anomaly detection
Workflow recommendations
```

Use cases:

```txt
ERP assistant
Natural language reports
Invoice extraction
Purchase order extraction
Lead scoring
Demand forecasting
Cash-flow forecasting
Anomaly detection
Suggested automations
Support ticket summaries
```

Recommended design:

```txt
AI provider adapter layer
Prompt templates
Audit logs
Human approval for risky actions
Tenant-level AI settings
Data access permission checks
```

## 14. Integration Stack

```txt
REST API
Webhooks
API keys
OAuth connections
Integration marketplace
SDK package
Connector adapters
```

Recommended:

```txt
services/integrations
modules/integration-marketplace
packages/integrations-sdk
apps/developer-portal
```

Integration types:

```txt
Email
WhatsApp
Payment gateways
E-commerce
Accounting imports
Logistics providers
Bank feeds
Tax systems
HR biometric devices
Barcode scanners
```

## 15. Search Stack

Start with PostgreSQL search:

```txt
PostgreSQL full-text search
pg_trgm
Search indexing tables
```

Later, for scale:

```txt
OpenSearch
Meilisearch
Typesense
Elasticsearch
```

Use search for:

```txt
Global ERP search
Customer search
Item search
Document search
Ticket search
Audit search
Command center
```

## 16. Testing Stack

```txt
Vitest
Node.js test runner
Supertest
Testing Library
MSW
Playwright
```

Recommended:

```txt
Vitest for unit/integration tests
Supertest for API contract tests
React Testing Library for components
Playwright for E2E
MSW for frontend API mocks
```

Test categories:

```txt
Unit tests
Repository tests
Service tests
Route tests
Permission tests
Workflow tests
Migration tests
API contract tests
E2E tests
Security tests
Load tests
```

## 17. Observability

```txt
Structured logging
Metrics
Tracing
Error tracking
Health checks
Audit logs
Queue dashboard
```

Recommended stack:

```txt
Pino or Winston
OpenTelemetry
Prometheus
Grafana
Sentry
CloudWatch
Bull Board
```

Recommended package:

```txt
packages/observability
```

It should provide:

```txt
logger
request tracing
error reporting
metrics helpers
audit context
job logging
tenant-aware logs
```

## 18. Infrastructure and Deployment

```txt
Docker
Docker Compose
Kubernetes
Terraform
AWS
GitHub Actions
```

AWS services:

```txt
EKS
RDS PostgreSQL
ElastiCache Redis
S3
CloudFront
Route 53
ACM
IAM
CloudWatch
Secrets Manager
ECR
```

Recommended deployment model:

```txt
Web app container
API container
Worker containers
Realtime container
Migration job
PostgreSQL RDS
Redis ElastiCache
S3 file storage
CloudWatch logs
```

## 19. CI/CD

```txt
GitHub Actions
Turbo
pnpm
Docker Build
Kubernetes deploy
Terraform plan/apply
Security scans
Migration checks
```

Pipelines:

```txt
ci.yml
monorepo-ci.yml
api-contracts.yml
database-migrations.yml
security-scan.yml
docker-build.yml
deploy-dev.yml
deploy-staging.yml
deploy-production.yml
backup-verify.yml
release.yml
```

Checks:

```txt
Lint
Typecheck
Unit tests
Integration tests
API contract tests
Migration safety
Docker build
Security scan
Dependency audit
Kubernetes manifest validation
```

## 20. Final Recommended Stack Summary

Frontend:

```txt
Next.js, React, TypeScript, Tailwind CSS, MUI, Emotion, Axios, TanStack Query, TanStack Table, Zod, React Hook Form
```

Mobile:

```txt
React Native, Expo, TypeScript, NativeWind, React Navigation, AsyncStorage, Expo Secure Store
```

Backend:

```txt
Node.js 20+, Express.js, TypeScript, Zod, Knex.js, pg, JWT, bcrypt, Helmet, CORS, Multer, Nodemailer
```

Database:

```txt
PostgreSQL, SQL migrations, Knex, tenant databases, control-plane database, views, functions, RLS
```

Cache, queues, and realtime:

```txt
Redis, BullMQ, Socket.IO, Socket.IO Redis Adapter
```

Storage:

```txt
AWS S3, signed URLs, document service, file scanning later
```

Testing:

```txt
Vitest, Node test runner, Supertest, React Testing Library, Playwright
```

Observability:

```txt
OpenTelemetry, Pino/Winston, Prometheus, Grafana, Sentry, CloudWatch, Bull Board
```

Infrastructure:

```txt
Docker, Kubernetes, Terraform, AWS EKS, RDS, ElastiCache, S3, ECR, CloudWatch
```

CI/CD:

```txt
GitHub Actions, Turbo, pnpm, Docker builds, migration checks, security scans
```

SaaS:

```txt
Tenant control plane, billing, metering, entitlements, feature flags, quotas, backups, restore
```

AI:

```txt
AI gateway, ERP assistant, document intelligence, forecasting, anomaly detection, workflow recommendations
```

Integrations:

```txt
REST API, webhooks, API keys, OAuth, marketplace, SDKs, connector adapters
```

## Recommendation

Keep the current base stack, but make the codebase TypeScript-first for long-term enterprise maintainability.
