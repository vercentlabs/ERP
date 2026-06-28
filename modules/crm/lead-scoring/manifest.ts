export const manifest = {
  domain: "crm",
  module: "lead-scoring",
  displayName: "Lead Scoring",
  routeBase: "/api/crm/lead-scoring",
  table: "crm_lead_scoring",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
