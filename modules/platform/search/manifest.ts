export const manifest = {
  domain: "platform",
  module: "search",
  displayName: "Search",
  routeBase: "/api/platform/search",
  table: "platform_search",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
