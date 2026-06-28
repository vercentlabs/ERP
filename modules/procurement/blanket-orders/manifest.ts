export const manifest = {
  domain: "procurement",
  module: "blanket-orders",
  displayName: "Blanket Orders",
  routeBase: "/api/procurement/blanket-orders",
  table: "procurement_blanket_orders",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
