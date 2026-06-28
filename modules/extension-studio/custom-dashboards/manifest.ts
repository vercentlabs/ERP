export const manifest = {
  domain: "extension-studio",
  module: "custom-dashboards",
  displayName: "Custom Dashboards",
  routeBase: "/api/extension-studio/custom-dashboards",
  table: "extension-studio_custom_dashboards",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
