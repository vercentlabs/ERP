export const manifest = {
  domain: "master-data",
  module: "data-quality",
  displayName: "Data Quality",
  routeBase: "/api/master-data/data-quality",
  table: "master-data_data_quality",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
