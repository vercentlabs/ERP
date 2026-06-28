export const manifest = {
  domain: "procurement",
  module: "purchase-requisitions",
  displayName: "Purchase Requisitions",
  routeBase: "/api/procurement/purchase-requisitions",
  table: "procurement_purchase_requisitions",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
