export const manifest = {
  domain: "payroll",
  module: "tax-declarations",
  displayName: "Tax Declarations",
  routeBase: "/api/payroll/tax-declarations",
  table: "payroll_tax_declarations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
