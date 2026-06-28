export const manifest = {
  domain: "crm",
  module: "leads",
  displayName: "Leads",
  routeBase: "/api/crm/leads",
  table: "crm_leads",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["view", "create", "update", "delete", "assign", "convert", "export"],
  aiUseCases: ["summarize", "score", "recommend-next-action", "detect-risk"],
} as const;
