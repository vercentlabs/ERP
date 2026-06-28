export const manifest = {
  domain: "payroll",
  module: "salary-components",
  displayName: "Salary Components",
  routeBase: "/api/payroll/salary-components",
  table: "payroll_salary_components",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
