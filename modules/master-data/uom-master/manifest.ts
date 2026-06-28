export const manifest = {
  domain: "master-data",
  module: "uom-master",
  displayName: "Uom Master",
  routeBase: "/api/master-data/uom-master",
  table: "master-data_uom_master",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
