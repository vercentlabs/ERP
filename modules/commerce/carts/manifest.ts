export const manifest = {
  domain: "commerce",
  module: "carts",
  displayName: "Carts",
  routeBase: "/api/commerce/carts",
  table: "commerce_carts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
