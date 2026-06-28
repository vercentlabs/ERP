export const manifest = {
  domain: "maintenance",
  module: "equipment",
  displayName: "Equipment",
  routeBase: "/api/maintenance/equipment",
  table: "maintenance_equipment",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
