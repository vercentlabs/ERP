export const manifest = {
  domain: "finance",
  module: "revenue-recognition",
  displayName: "Revenue Recognition",
  routeBase: "/api/finance/revenue-recognition",
  table: "finance_revenue_recognition",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
