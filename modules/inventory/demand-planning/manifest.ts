export const manifest = {
  domain: "inventory",
  module: "demand-planning",
  displayName: "Demand Planning",
  routeBase: "/api/inventory/demand-planning",
  table: "inventory_demand_planning",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
