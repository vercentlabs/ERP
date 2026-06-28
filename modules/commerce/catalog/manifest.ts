export const manifest = {
  domain: "commerce",
  module: "catalog",
  displayName: "Catalog",
  routeBase: "/api/commerce/catalog",
  table: "commerce_catalog",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
