export const manifest = {
  domain: "hr",
  module: "employee-documents",
  displayName: "Employee Documents",
  routeBase: "/api/hr/employee-documents",
  table: "hr_employee_documents",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
