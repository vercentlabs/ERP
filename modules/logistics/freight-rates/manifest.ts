export const manifest = {
  domain: "logistics",
  module: "freight-rates",
  displayName: "Freight Rates",
  routeBase: "/api/logistics/freight-rates",
  table: "logistics_freight_rates",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
