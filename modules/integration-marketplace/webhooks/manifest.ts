export const manifest = {
  domain: "integration-marketplace",
  module: "webhooks",
  displayName: "Webhooks",
  routeBase: "/api/integration-marketplace/webhooks",
  table: "integration-marketplace_webhooks",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
