export const manifest = {
  domain: "extension-studio",
  module: "custom-objects",
  displayName: "Custom Objects",
  routeBase: "/api/extension-studio/custom-objects",
  table: "extension-studio_custom_objects",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
