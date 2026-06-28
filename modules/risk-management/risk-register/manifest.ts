export const manifest = {
  domain: "risk-management",
  module: "risk-register",
  displayName: "Risk Register",
  routeBase: "/api/risk-management/risk-register",
  table: "risk-management_risk_register",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
