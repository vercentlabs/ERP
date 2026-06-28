export const manifest = {
  domain: "product-lifecycle",
  module: "lifecycle-costing",
  displayName: "Lifecycle Costing",
  routeBase: "/api/product-lifecycle/lifecycle-costing",
  table: "product-lifecycle_lifecycle_costing",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
