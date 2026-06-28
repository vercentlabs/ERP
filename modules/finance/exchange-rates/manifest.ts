export const manifest = {
  domain: "finance",
  module: "exchange-rates",
  displayName: "Exchange Rates",
  routeBase: "/api/finance/exchange-rates",
  table: "finance_exchange_rates",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
