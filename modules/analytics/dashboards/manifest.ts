export const manifest = {
  domain: "analytics",
  module: "dashboards",
  displayName: "Dashboards",
  routeBase: "/api/analytics/dashboards",
  table: "analytics_dashboards",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
