export const manifest = {
  domain: "master-data",
  module: "suppliers",
  displayName: "Suppliers",
  routeBase: "/api/master-data/suppliers",
  table: "master-data_suppliers",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
