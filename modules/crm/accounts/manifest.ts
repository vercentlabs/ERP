export const manifest = {
  domain: "crm",
  module: "accounts",
  displayName: "Accounts",
  routeBase: "/api/crm/accounts",
  table: "crm_accounts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
