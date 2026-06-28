export const manifest = {
  domain: "logistics",
  module: "shipments",
  displayName: "Shipments",
  routeBase: "/api/logistics/shipments",
  table: "logistics_shipments",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
