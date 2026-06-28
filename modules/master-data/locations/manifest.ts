export const manifest = {
  domain: "master-data",
  module: "locations",
  displayName: "Locations",
  routeBase: "/api/master-data/locations",
  table: "master-data_locations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
