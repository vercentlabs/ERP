export const manifest = {
  domain: "procurement",
  module: "goods-receipts",
  displayName: "Goods Receipts",
  routeBase: "/api/procurement/goods-receipts",
  table: "procurement_goods_receipts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
