export const manifest = {
  domain: "commerce",
  module: "commerce-orders",
  displayName: "Commerce Orders",
  routeBase: "/api/commerce/commerce-orders",
  table: "commerce_commerce_orders",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
