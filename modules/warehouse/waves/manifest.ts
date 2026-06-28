export const manifest = {
  domain: "warehouse",
  module: "waves",
  displayName: "Waves",
  routeBase: "/api/warehouse/waves",
  table: "warehouse_waves",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
