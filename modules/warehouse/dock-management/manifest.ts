export const manifest = {
  domain: "warehouse",
  module: "dock-management",
  displayName: "Dock Management",
  routeBase: "/api/warehouse/dock-management",
  table: "warehouse_dock_management",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
