export const manifest = {
  domain: "payroll",
  module: "localizations/india/tds",
  displayName: "Localizations India Tds",
  routeBase: "/api/payroll/localizations/india/tds",
  table: "payroll_localizations_india_tds",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
