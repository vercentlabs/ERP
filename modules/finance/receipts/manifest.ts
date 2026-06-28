export const manifest = {
  domain: "finance",
  module: "receipts",
  displayName: "Receipts",
  routeBase: "/api/finance/receipts",
  table: "finance_receipts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
