export const manifest = {
  domain: "maintenance",
  module: "maintenance-orders",
  displayName: "Maintenance Orders",
  routeBase: "/api/maintenance/maintenance-orders",
  table: "maintenance_maintenance_orders",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
