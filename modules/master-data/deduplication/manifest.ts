export const manifest = {
  domain: "master-data",
  module: "deduplication",
  displayName: "Deduplication",
  routeBase: "/api/master-data/deduplication",
  table: "master-data_deduplication",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
