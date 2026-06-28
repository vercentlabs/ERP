export const manifest = {
  domain: "payroll",
  module: "localizations/india/professional-tax",
  displayName: "Localizations India Professional Tax",
  routeBase: "/api/payroll/localizations/india/professional-tax",
  table: "payroll_localizations_india_professional_tax",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
