export const manifest = {
  domain: "finance",
  module: "payments",
  displayName: "Payments",
  routeBase: "/api/finance/payments",
  table: "finance_payments",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
