export const manifest = {
  domain: "integration-marketplace",
  module: "connectors",
  displayName: "Connectors",
  routeBase: "/api/integration-marketplace/connectors",
  table: "integration-marketplace_connectors",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
