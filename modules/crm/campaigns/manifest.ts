export const manifest = {
  domain: "crm",
  module: "campaigns",
  displayName: "Campaigns",
  routeBase: "/api/crm/campaigns",
  table: "crm_campaigns",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
