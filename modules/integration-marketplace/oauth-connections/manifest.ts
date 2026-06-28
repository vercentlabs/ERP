export const manifest = {
  domain: "integration-marketplace",
  module: "oauth-connections",
  displayName: "Oauth Connections",
  routeBase: "/api/integration-marketplace/oauth-connections",
  table: "integration-marketplace_oauth_connections",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
