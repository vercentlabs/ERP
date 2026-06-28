export const manifest = {
  domain: "warehouse",
  module: "putaway",
  displayName: "Putaway",
  routeBase: "/api/warehouse/putaway",
  table: "warehouse_putaway",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
