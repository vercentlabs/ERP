export const manifest = {
  domain: "finance",
  module: "accounts-payable",
  displayName: "Accounts Payable",
  routeBase: "/api/finance/accounts-payable",
  table: "finance_accounts_payable",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
