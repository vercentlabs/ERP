export const manifest = {
  domain: "platform",
  module: "exports",
  displayName: "Exports",
  routeBase: "/api/platform/exports",
  table: "platform_exports",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
