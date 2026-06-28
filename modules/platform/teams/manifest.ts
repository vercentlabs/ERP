export const manifest = {
  domain: "platform",
  module: "teams",
  displayName: "Teams",
  routeBase: "/api/platform/teams",
  table: "platform_teams",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
