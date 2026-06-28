export const manifest = {
  domain: "maintenance",
  module: "spare-parts",
  displayName: "Spare Parts",
  routeBase: "/api/maintenance/spare-parts",
  table: "maintenance_spare_parts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
