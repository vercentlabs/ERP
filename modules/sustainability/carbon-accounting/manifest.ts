export const manifest = {
  domain: "sustainability",
  module: "carbon-accounting",
  displayName: "Carbon Accounting",
  routeBase: "/api/sustainability/carbon-accounting",
  table: "sustainability_carbon_accounting",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
