export const manifest = {
  domain: "warehouse",
  module: "picking",
  displayName: "Picking",
  routeBase: "/api/warehouse/picking",
  table: "warehouse_picking",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
