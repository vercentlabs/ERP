export const manifest = {
  domain: "finance",
  module: "deferred-revenue",
  displayName: "Deferred Revenue",
  routeBase: "/api/finance/deferred-revenue",
  table: "finance_deferred_revenue",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
