export const manifest = {
  domain: "hr",
  module: "departments",
  displayName: "Departments",
  routeBase: "/api/hr/departments",
  table: "hr_departments",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
