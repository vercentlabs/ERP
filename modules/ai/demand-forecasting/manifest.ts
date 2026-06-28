export const manifest = {
  domain: "ai",
  module: "demand-forecasting",
  displayName: "Demand Forecasting",
  routeBase: "/api/ai/demand-forecasting",
  table: "ai_demand_forecasting",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
