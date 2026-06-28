export const manifest = {
  domain: "finance",
  module: "profit-centers",
  displayName: "Profit Centers",
  routeBase: "/api/finance/profit-centers",
  table: "finance_profit_centers",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
