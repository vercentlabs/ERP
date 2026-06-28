# Multi Tenancy

This document defines the Vercent ERP multi tenancy plan for the SaaS platform.

## Scope

- Tenant-aware operation across companies and branches.
- Auditability for sensitive business activity.
- Integration with the module runtime, workflows, reporting, and AI recommendations.

## Implementation Notes

Use the shared TypeScript packages, SQL-first migrations, role and attribute based permissions, and structured observability described in the core docs.
