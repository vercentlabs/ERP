export const manifest = {
  domain: "integration-marketplace",
  module: "api-keys",
  displayName: "Api Keys",
  routeBase: "/api/integration-marketplace/api-keys",
  table: "integration-marketplace_api_keys",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
