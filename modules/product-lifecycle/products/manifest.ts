export const manifest = {
  domain: "product-lifecycle",
  module: "products",
  displayName: "Products",
  routeBase: "/api/product-lifecycle/products",
  table: "product-lifecycle_products",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
