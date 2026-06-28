export const manifest = {
  domain: "crm",
  module: "customers",
  displayName: "Customers",
  routeBase: "/api/crm/customers",
  table: "crm_customers",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
