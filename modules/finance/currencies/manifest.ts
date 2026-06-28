export const manifest = {
  domain: "finance",
  module: "currencies",
  displayName: "Currencies",
  routeBase: "/api/finance/currencies",
  table: "finance_currencies",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
