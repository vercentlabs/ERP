export const manifest = {
  domain: "logistics",
  module: "shipment-tracking",
  displayName: "Shipment Tracking",
  routeBase: "/api/logistics/shipment-tracking",
  table: "logistics_shipment_tracking",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
