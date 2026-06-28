export const manifest = {
  domain: "ai",
  module: "cash-flow-forecasting",
  displayName: "Cash Flow Forecasting",
  routeBase: "/api/ai/cash-flow-forecasting",
  table: "ai_cash_flow_forecasting",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
