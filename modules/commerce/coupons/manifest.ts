export const manifest = {
  domain: "commerce",
  module: "coupons",
  displayName: "Coupons",
  routeBase: "/api/commerce/coupons",
  table: "commerce_coupons",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
