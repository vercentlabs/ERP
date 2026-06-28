export const manifest = {
  domain: "logistics",
  module: "routes",
  displayName: "Routes",
  routeBase: "/api/logistics/routes",
  table: "logistics_routes",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
