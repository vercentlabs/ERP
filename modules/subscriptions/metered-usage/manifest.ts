export const manifest = {
  domain: "subscriptions",
  module: "metered-usage",
  displayName: "Metered Usage",
  routeBase: "/api/subscriptions/metered-usage",
  table: "subscriptions_metered_usage",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
