export const manifest = {
  domain: "payroll",
  module: "payslips",
  displayName: "Payslips",
  routeBase: "/api/payroll/payslips",
  table: "payroll_payslips",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
