export const manifest = {
  domain: "sales",
  module: "forecasting",
  displayName: "Forecasting",
  routeBase: "/api/sales/forecasting",
  table: "sales_forecasting",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
