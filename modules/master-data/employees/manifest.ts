export const manifest = {
  domain: "master-data",
  module: "employees",
  displayName: "Employees",
  routeBase: "/api/master-data/employees",
  table: "master-data_employees",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
