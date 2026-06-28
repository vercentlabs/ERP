export const manifest = {
  domain: "logistics",
  module: "delivery-runs",
  displayName: "Delivery Runs",
  routeBase: "/api/logistics/delivery-runs",
  table: "logistics_delivery_runs",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
