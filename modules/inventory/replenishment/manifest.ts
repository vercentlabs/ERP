export const manifest = {
  domain: "inventory",
  module: "replenishment",
  displayName: "Replenishment",
  routeBase: "/api/inventory/replenishment",
  table: "inventory_replenishment",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
