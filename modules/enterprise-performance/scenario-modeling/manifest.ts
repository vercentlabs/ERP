export const manifest = {
  domain: "enterprise-performance",
  module: "scenario-modeling",
  displayName: "Scenario Modeling",
  routeBase: "/api/enterprise-performance/scenario-modeling",
  table: "enterprise-performance_scenario_modeling",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
