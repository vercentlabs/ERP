export const manifest = {
  domain: "subscriptions",
  module: "dunning",
  displayName: "Dunning",
  routeBase: "/api/subscriptions/dunning",
  table: "subscriptions_dunning",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
