export const manifest = {
  domain: "manufacturing",
  module: "shop-floor",
  displayName: "Shop Floor",
  routeBase: "/api/manufacturing/shop-floor",
  table: "manufacturing_shop_floor",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
