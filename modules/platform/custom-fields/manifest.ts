export const manifest = {
  domain: "platform",
  module: "custom-fields",
  displayName: "Custom Fields",
  routeBase: "/api/platform/custom-fields",
  table: "platform_custom_fields",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
