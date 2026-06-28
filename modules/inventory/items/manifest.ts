export const manifest = {
  domain: "inventory",
  module: "items",
  displayName: "Items",
  routeBase: "/api/inventory/items",
  table: "inventory_items",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
