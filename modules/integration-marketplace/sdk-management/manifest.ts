export const manifest = {
  domain: "integration-marketplace",
  module: "sdk-management",
  displayName: "Sdk Management",
  routeBase: "/api/integration-marketplace/sdk-management",
  table: "integration-marketplace_sdk_management",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
