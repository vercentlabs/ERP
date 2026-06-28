export const manifest = {
  domain: "warehouse",
  module: "replenishment-tasks",
  displayName: "Replenishment Tasks",
  routeBase: "/api/warehouse/replenishment-tasks",
  table: "warehouse_replenishment_tasks",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
