export const manifest = {
  domain: "maintenance",
  module: "preventive-maintenance",
  displayName: "Preventive Maintenance",
  routeBase: "/api/maintenance/preventive-maintenance",
  table: "maintenance_preventive_maintenance",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
