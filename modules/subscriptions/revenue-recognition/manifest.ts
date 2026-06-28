export const manifest = {
  domain: "subscriptions",
  module: "revenue-recognition",
  displayName: "Revenue Recognition",
  routeBase: "/api/subscriptions/revenue-recognition",
  table: "subscriptions_revenue_recognition",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
