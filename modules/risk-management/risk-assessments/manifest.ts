export const manifest = {
  domain: "risk-management",
  module: "risk-assessments",
  displayName: "Risk Assessments",
  routeBase: "/api/risk-management/risk-assessments",
  table: "risk-management_risk_assessments",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
