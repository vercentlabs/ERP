export const manifest = {
  domain: "finance",
  module: "budgets",
  displayName: "Budgets",
  routeBase: "/api/finance/budgets",
  table: "finance_budgets",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
