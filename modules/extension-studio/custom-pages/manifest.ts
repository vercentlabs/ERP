export const manifest = {
  domain: "extension-studio",
  module: "custom-pages",
  displayName: "Custom Pages",
  routeBase: "/api/extension-studio/custom-pages",
  table: "extension-studio_custom_pages",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
