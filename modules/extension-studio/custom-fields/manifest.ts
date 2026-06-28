export const manifest = {
  domain: "extension-studio",
  module: "custom-fields",
  displayName: "Custom Fields",
  routeBase: "/api/extension-studio/custom-fields",
  table: "extension-studio_custom_fields",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
