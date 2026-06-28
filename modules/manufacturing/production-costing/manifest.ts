export const manifest = {
  domain: "manufacturing",
  module: "production-costing",
  displayName: "Production Costing",
  routeBase: "/api/manufacturing/production-costing",
  table: "manufacturing_production_costing",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
