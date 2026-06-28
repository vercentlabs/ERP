export const manifest = {
  domain: "finance",
  module: "sub-ledgers",
  displayName: "Sub Ledgers",
  routeBase: "/api/finance/sub-ledgers",
  table: "finance_sub_ledgers",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
