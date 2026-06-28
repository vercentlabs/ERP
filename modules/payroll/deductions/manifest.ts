export const manifest = {
  domain: "payroll",
  module: "deductions",
  displayName: "Deductions",
  routeBase: "/api/payroll/deductions",
  table: "payroll_deductions",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
