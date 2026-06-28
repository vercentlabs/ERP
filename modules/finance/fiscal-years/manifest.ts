export const manifest = {
  domain: "finance",
  module: "fiscal-years",
  displayName: "Fiscal Years",
  routeBase: "/api/finance/fiscal-years",
  table: "finance_fiscal_years",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
