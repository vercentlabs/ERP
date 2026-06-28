export const manifest = {
  domain: "extension-studio",
  module: "validation-rules",
  displayName: "Validation Rules",
  routeBase: "/api/extension-studio/validation-rules",
  table: "extension-studio_validation_rules",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
