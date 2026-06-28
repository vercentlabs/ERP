export const manifest = {
  domain: "extension-studio",
  module: "custom-reports",
  displayName: "Custom Reports",
  routeBase: "/api/extension-studio/custom-reports",
  table: "extension-studio_custom_reports",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
