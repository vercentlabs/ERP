export const manifest = {
  domain: "analytics",
  module: "kpis",
  displayName: "Kpis",
  routeBase: "/api/analytics/kpis",
  table: "analytics_kpis",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
