export const manifest = {
  domain: "finance",
  module: "chart-of-accounts",
  displayName: "Chart Of Accounts",
  routeBase: "/api/finance/chart-of-accounts",
  table: "finance_chart_of_accounts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
