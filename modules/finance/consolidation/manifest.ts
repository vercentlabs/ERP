export const manifest = {
  domain: "finance",
  module: "consolidation",
  displayName: "Consolidation",
  routeBase: "/api/finance/consolidation",
  table: "finance_consolidation",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
