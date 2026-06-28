export const manifest = {
  domain: "extension-studio",
  module: "scripting",
  displayName: "Scripting",
  routeBase: "/api/extension-studio/scripting",
  table: "extension-studio_scripting",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
