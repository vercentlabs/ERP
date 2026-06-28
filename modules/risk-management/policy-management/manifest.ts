export const manifest = {
  domain: "risk-management",
  module: "policy-management",
  displayName: "Policy Management",
  routeBase: "/api/risk-management/policy-management",
  table: "risk-management_policy_management",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
