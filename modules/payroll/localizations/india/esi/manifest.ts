export const manifest = {
  domain: "payroll",
  module: "localizations/india/esi",
  displayName: "Localizations India Esi",
  routeBase: "/api/payroll/localizations/india/esi",
  table: "payroll_localizations_india_esi",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
