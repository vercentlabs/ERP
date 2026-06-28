export const manifest = {
  domain: "enterprise-performance",
  module: "management-reporting",
  displayName: "Management Reporting",
  routeBase: "/api/enterprise-performance/management-reporting",
  table: "enterprise-performance_management_reporting",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
