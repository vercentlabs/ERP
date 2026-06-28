export const manifest = {
  domain: "subscriptions",
  module: "plans",
  displayName: "Plans",
  routeBase: "/api/subscriptions/plans",
  table: "subscriptions_plans",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
