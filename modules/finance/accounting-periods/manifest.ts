export const manifest = {
  domain: "finance",
  module: "accounting-periods",
  displayName: "Accounting Periods",
  routeBase: "/api/finance/accounting-periods",
  table: "finance_accounting_periods",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
