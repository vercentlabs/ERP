export const manifest = {
  domain: "finance",
  module: "taxes",
  displayName: "Taxes",
  routeBase: "/api/finance/taxes",
  table: "finance_taxes",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
