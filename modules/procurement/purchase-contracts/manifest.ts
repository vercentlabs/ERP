export const manifest = {
  domain: "procurement",
  module: "purchase-contracts",
  displayName: "Purchase Contracts",
  routeBase: "/api/procurement/purchase-contracts",
  table: "procurement_purchase_contracts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
