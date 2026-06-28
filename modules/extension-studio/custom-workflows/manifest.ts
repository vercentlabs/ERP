export const manifest = {
  domain: "extension-studio",
  module: "custom-workflows",
  displayName: "Custom Workflows",
  routeBase: "/api/extension-studio/custom-workflows",
  table: "extension-studio_custom_workflows",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
