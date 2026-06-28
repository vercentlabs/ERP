export const manifest = {
  domain: "analytics",
  module: "data-marts",
  displayName: "Data Marts",
  routeBase: "/api/analytics/data-marts",
  table: "analytics_data_marts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
