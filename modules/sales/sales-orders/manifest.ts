export const manifest = {
  domain: "sales",
  module: "sales-orders",
  displayName: "Sales Orders",
  routeBase: "/api/sales/orders",
  table: "sales_orders",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["view", "create", "update", "delete", "change-status", "convert-from-quotation", "export", "print"],
  aiUseCases: ["summarize-order-risk", "recommend-fulfillment-actions", "detect-delivery-risk"],
} as const;
