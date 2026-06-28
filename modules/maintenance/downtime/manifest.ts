export const manifest = {
  domain: "maintenance",
  module: "downtime",
  displayName: "Downtime",
  routeBase: "/api/maintenance/downtime",
  table: "maintenance_downtime",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
