export const manifest = {
  domain: "payroll",
  module: "payroll-runs",
  displayName: "Payroll Runs",
  routeBase: "/api/payroll/payroll-runs",
  table: "payroll_payroll_runs",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
