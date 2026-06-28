export const manifest = {
  domain: "manufacturing",
  module: "production-orders",
  displayName: "Production Orders",
  routeBase: "/api/manufacturing/production-orders",
  table: "manufacturing_production_orders",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
