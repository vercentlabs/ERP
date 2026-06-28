export const manifest = {
  domain: "subscriptions",
  module: "renewals",
  displayName: "Renewals",
  routeBase: "/api/subscriptions/renewals",
  table: "subscriptions_renewals",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
