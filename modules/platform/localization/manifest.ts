export const manifest = {
  domain: "platform",
  module: "localization",
  displayName: "Localization",
  routeBase: "/api/platform/localization",
  table: "platform_localization",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
