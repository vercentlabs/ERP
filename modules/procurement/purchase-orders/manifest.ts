export const manifest = {
  domain: "procurement",
  module: "purchase-orders",
  displayName: "Purchase Orders",
  routeBase: "/api/procurement/purchase-orders",
  table: "procurement_purchase_orders",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
