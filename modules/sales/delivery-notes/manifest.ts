export const manifest = {
  domain: "sales",
  module: "delivery-notes",
  displayName: "Delivery Notes",
  routeBase: "/api/sales/delivery-notes",
  table: "sales_delivery_notes",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
