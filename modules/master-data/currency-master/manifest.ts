export const manifest = {
  domain: "master-data",
  module: "currency-master",
  displayName: "Currency Master",
  routeBase: "/api/master-data/currency-master",
  table: "master-data_currency_master",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
