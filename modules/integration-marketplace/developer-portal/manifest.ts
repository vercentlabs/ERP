export const manifest = {
  domain: "integration-marketplace",
  module: "developer-portal",
  displayName: "Developer Portal",
  routeBase: "/api/integration-marketplace/developer-portal",
  table: "integration-marketplace_developer_portal",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
