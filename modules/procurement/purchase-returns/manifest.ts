export const manifest = {
  domain: "procurement",
  module: "purchase-returns",
  displayName: "Purchase Returns",
  routeBase: "/api/procurement/purchase-returns",
  table: "procurement_purchase_returns",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
