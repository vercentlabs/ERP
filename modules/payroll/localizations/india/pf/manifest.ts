export const manifest = {
  domain: "payroll",
  module: "localizations/india/pf",
  displayName: "Localizations India Pf",
  routeBase: "/api/payroll/localizations/india/pf",
  table: "payroll_localizations_india_pf",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
