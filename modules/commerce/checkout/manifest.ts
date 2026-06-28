export const manifest = {
  domain: "commerce",
  module: "checkout",
  displayName: "Checkout",
  routeBase: "/api/commerce/checkout",
  table: "commerce_checkout",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
