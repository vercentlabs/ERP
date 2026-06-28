export const manifest = {
  domain: "finance",
  module: "bank-reconciliation",
  displayName: "Bank Reconciliation",
  routeBase: "/api/finance/bank-reconciliation",
  table: "finance_bank_reconciliation",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
