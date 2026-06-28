export const manifest = {
  domain: "master-data",
  module: "tax-master",
  displayName: "Tax Master",
  routeBase: "/api/master-data/tax-master",
  table: "master-data_tax_master",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
