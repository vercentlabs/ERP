export const manifest = {
  domain: "enterprise-performance",
  module: "planning",
  displayName: "Planning",
  routeBase: "/api/enterprise-performance/planning",
  table: "enterprise-performance_planning",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
