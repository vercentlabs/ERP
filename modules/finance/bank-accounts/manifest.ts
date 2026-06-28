export const manifest = {
  domain: "finance",
  module: "bank-accounts",
  displayName: "Bank Accounts",
  routeBase: "/api/finance/bank-accounts",
  table: "finance_bank_accounts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
