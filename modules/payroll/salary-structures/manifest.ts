export const manifest = {
  domain: "payroll",
  module: "salary-structures",
  displayName: "Salary Structures",
  routeBase: "/api/payroll/salary-structures",
  table: "payroll_salary_structures",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
