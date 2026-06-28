export const manifest = {
  domain: "master-data",
  module: "parties",
  displayName: "Parties",
  routeBase: "/api/master-data/parties",
  table: "master-data_parties",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
