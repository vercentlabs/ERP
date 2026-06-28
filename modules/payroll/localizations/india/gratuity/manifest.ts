export const manifest = {
  domain: "payroll",
  module: "localizations/india/gratuity",
  displayName: "Localizations India Gratuity",
  routeBase: "/api/payroll/localizations/india/gratuity",
  table: "payroll_localizations_india_gratuity",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
