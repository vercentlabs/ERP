export const manifest = {
  domain: "finance",
  module: "cash-flow",
  displayName: "Cash Flow",
  routeBase: "/api/finance/cash-flow",
  table: "finance_cash_flow",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
