export const manifest = {
  domain: "inventory",
  module: "item-categories",
  displayName: "Item Categories",
  routeBase: "/api/inventory/item-categories",
  table: "inventory_item_categories",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
