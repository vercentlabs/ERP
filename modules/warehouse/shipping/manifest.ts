export const manifest = {
  domain: "warehouse",
  module: "shipping",
  displayName: "Shipping",
  routeBase: "/api/warehouse/shipping",
  table: "warehouse_shipping",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
