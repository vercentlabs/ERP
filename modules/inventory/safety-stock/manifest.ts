export const manifest = {
  domain: "inventory",
  module: "safety-stock",
  displayName: "Safety Stock",
  routeBase: "/api/inventory/safety-stock",
  table: "inventory_safety_stock",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
