export const manifest = {
  domain: "crm",
  module: "opportunities",
  displayName: "Opportunities",
  routeBase: "/api/crm/opportunities",
  table: "crm_opportunities",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["view", "create", "update", "delete", "assign", "change-stage", "forecast", "export"],
  aiUseCases: ["summarize", "recommend-next-action", "forecast", "detect-risk"],
} as const;
