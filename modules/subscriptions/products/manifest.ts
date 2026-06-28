export const manifest = {
  domain: "subscriptions",
  module: "products",
  displayName: "Products",
  routeBase: "/api/subscriptions/products",
  table: "subscriptions_products",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
