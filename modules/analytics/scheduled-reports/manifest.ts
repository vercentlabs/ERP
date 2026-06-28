export const manifest = {
  domain: "analytics",
  module: "scheduled-reports",
  displayName: "Scheduled Reports",
  routeBase: "/api/analytics/scheduled-reports",
  table: "analytics_scheduled_reports",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
