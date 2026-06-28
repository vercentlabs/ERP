export const manifest = {
  domain: "hr",
  module: "employees",
  displayName: "Employees",
  routeBase: "/api/hr/employees",
  table: "hr_employees",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
