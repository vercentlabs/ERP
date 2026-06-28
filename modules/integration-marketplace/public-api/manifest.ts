export const manifest = {
  domain: "integration-marketplace",
  module: "public-api",
  displayName: "Public Api",
  routeBase: "/api/integration-marketplace/public-api",
  table: "integration-marketplace_public_api",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
