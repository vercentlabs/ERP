export const manifest = {
  domain: "analytics",
  module: "ai-insights",
  displayName: "Ai Insights",
  routeBase: "/api/analytics/ai-insights",
  table: "analytics_ai_insights",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
