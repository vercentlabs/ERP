export const manifest = {
  domain: "analytics",
  module: "embedded-analytics",
  displayName: "Embedded Analytics",
  routeBase: "/api/analytics/embedded-analytics",
  table: "analytics_embedded_analytics",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
