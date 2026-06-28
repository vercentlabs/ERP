export const manifest = {
  domain: "finance",
  module: "cost-centers",
  displayName: "Cost Centers",
  routeBase: "/api/finance/cost-centers",
  table: "finance_cost_centers",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
