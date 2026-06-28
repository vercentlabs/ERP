export const manifest = {
  domain: "product-lifecycle",
  module: "variants",
  displayName: "Variants",
  routeBase: "/api/product-lifecycle/variants",
  table: "product-lifecycle_variants",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
