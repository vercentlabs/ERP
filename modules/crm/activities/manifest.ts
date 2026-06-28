export const manifest = {
  domain: "crm",
  module: "activities",
  displayName: "Activities",
  routeBase: "/api/crm/activities",
  table: "crm_activities",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
