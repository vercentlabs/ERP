export const manifest = {
  domain: "master-data",
  module: "data-governance",
  displayName: "Data Governance",
  routeBase: "/api/master-data/data-governance",
  table: "master-data_data_governance",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
