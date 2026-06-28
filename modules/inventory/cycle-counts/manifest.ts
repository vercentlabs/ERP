export const manifest = {
  domain: "inventory",
  module: "cycle-counts",
  displayName: "Cycle Counts",
  routeBase: "/api/inventory/cycle-counts",
  table: "inventory_cycle_counts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
