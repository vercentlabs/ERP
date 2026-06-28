export const manifest = {
  domain: "commerce",
  module: "storefront",
  displayName: "Storefront",
  routeBase: "/api/commerce/storefront",
  table: "commerce_storefront",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
