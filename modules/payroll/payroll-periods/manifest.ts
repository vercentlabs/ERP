export const manifest = {
  domain: "payroll",
  module: "payroll-periods",
  displayName: "Payroll Periods",
  routeBase: "/api/payroll/payroll-periods",
  table: "payroll_payroll_periods",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
