export const manifest = {
  domain: "analytics",
  module: "reports",
  displayName: "Reports",
  routeBase: "/api/analytics/reports",
  table: "analytics_reports",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
