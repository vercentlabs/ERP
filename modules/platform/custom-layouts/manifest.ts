export const manifest = {
  domain: "platform",
  module: "custom-layouts",
  displayName: "Custom Layouts",
  routeBase: "/api/platform/custom-layouts",
  table: "platform_custom_layouts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
