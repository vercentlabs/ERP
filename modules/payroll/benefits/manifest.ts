export const manifest = {
  domain: "payroll",
  module: "benefits",
  displayName: "Benefits",
  routeBase: "/api/payroll/benefits",
  table: "payroll_benefits",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
