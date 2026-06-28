export const manifest = {
  domain: "payroll",
  module: "loans-advances",
  displayName: "Loans Advances",
  routeBase: "/api/payroll/loans-advances",
  table: "payroll_loans_advances",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
