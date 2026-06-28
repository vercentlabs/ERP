export const manifest = {
  domain: "product-lifecycle",
  module: "product-revisions",
  displayName: "Product Revisions",
  routeBase: "/api/product-lifecycle/product-revisions",
  table: "product-lifecycle_product_revisions",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
