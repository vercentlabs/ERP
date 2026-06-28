export const manifest = {
  domain: "master-data",
  module: "customers",
  displayName: "Customers",
  routeBase: "/api/master-data/customers",
  table: "master-data_customers",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
