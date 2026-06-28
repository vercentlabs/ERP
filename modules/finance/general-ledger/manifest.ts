export const manifest = {
  domain: "finance",
  module: "general-ledger",
  displayName: "General Ledger",
  routeBase: "/api/finance/general-ledger",
  table: "finance_general_ledger",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
