export const manifest = {
  domain: "finance",
  module: "period-close",
  displayName: "Period Close",
  routeBase: "/api/finance/period-close",
  table: "finance_period_close",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
