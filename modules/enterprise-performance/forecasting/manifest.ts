export const manifest = {
  domain: "enterprise-performance",
  module: "forecasting",
  displayName: "Forecasting",
  routeBase: "/api/enterprise-performance/forecasting",
  table: "enterprise-performance_forecasting",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
