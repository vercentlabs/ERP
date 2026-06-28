export const manifest = {
  domain: "crm",
  module: "contacts",
  displayName: "Contacts",
  routeBase: "/api/crm/contacts",
  table: "crm_contacts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
