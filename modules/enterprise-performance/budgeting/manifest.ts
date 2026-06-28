export const manifest = {
  domain: "enterprise-performance",
  module: "budgeting",
  displayName: "Budgeting",
  routeBase: "/api/enterprise-performance/budgeting",
  table: "enterprise-performance_budgeting",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
