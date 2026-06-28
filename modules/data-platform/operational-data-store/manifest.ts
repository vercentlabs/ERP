export const manifest = {
  domain: "data-platform",
  module: "operational-data-store",
  displayName: "Operational Data Store",
  routeBase: "/api/data-platform/operational-data-store",
  table: "data-platform_operational_data_store",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
