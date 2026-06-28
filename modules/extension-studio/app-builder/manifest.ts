export const manifest = {
  domain: "extension-studio",
  module: "app-builder",
  displayName: "App Builder",
  routeBase: "/api/extension-studio/app-builder",
  table: "extension-studio_app_builder",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
