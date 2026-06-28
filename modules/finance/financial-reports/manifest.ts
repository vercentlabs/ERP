export const manifest = {
  domain: "finance",
  module: "financial-reports",
  displayName: "Financial Reports",
  routeBase: "/api/finance/financial-reports",
  table: "finance_financial_reports",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
