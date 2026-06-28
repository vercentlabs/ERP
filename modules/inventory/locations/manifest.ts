export const manifest = {
  domain: "inventory",
  module: "locations",
  displayName: "Locations",
  routeBase: "/api/inventory/locations",
  table: "inventory_locations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
