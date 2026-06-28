export const manifest = {
  domain: "platform",
  module: "integrations",
  displayName: "Integrations",
  routeBase: "/api/platform/integrations",
  table: "platform_integrations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
