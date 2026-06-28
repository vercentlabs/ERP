export const manifest = {
  domain: "platform",
  module: "branches",
  displayName: "Branches",
  routeBase: "/api/platform/branches",
  table: "platform_branches",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
