export const manifest = {
  domain: "enterprise-performance",
  module: "variance-analysis",
  displayName: "Variance Analysis",
  routeBase: "/api/enterprise-performance/variance-analysis",
  table: "enterprise-performance_variance_analysis",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
