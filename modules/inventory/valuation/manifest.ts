export const manifest = {
  domain: "inventory",
  module: "valuation",
  displayName: "Valuation",
  routeBase: "/api/inventory/valuation",
  table: "inventory_valuation",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
