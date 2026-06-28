export const manifest = {
  domain: "subscriptions",
  module: "contracts",
  displayName: "Contracts",
  routeBase: "/api/subscriptions/contracts",
  table: "subscriptions_contracts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
