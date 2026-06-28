export const manifest = {
  domain: "crm",
  module: "customer-360",
  displayName: "Customer 360",
  routeBase: "/api/crm/customer-360",
  table: "crm_customer_360",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
