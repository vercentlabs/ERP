export const manifest = {
  domain: "payroll",
  module: "localizations/india/form-16",
  displayName: "Localizations India Form 16",
  routeBase: "/api/payroll/localizations/india/form-16",
  table: "payroll_localizations_india_form_16",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
