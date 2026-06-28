export const manifest = {
  domain: "product-lifecycle",
  module: "engineering-change-orders",
  displayName: "Engineering Change Orders",
  routeBase: "/api/product-lifecycle/engineering-change-orders",
  table: "product-lifecycle_engineering_change_orders",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
