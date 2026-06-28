export const manifest = {
  domain: "sales",
  module: "credit-notes",
  displayName: "Credit Notes",
  routeBase: "/api/sales/credit-notes",
  table: "sales_credit_notes",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
