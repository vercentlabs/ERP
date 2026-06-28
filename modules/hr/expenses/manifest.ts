export const manifest = {
  domain: "hr",
  module: "expenses",
  displayName: "Expenses",
  routeBase: "/api/hr/expenses",
  table: "hr_expenses",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
