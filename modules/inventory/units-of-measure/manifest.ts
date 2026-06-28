export const manifest = {
  domain: "inventory",
  module: "units-of-measure",
  displayName: "Units Of Measure",
  routeBase: "/api/inventory/units-of-measure",
  table: "inventory_units_of_measure",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
