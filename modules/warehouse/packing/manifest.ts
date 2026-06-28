export const manifest = {
  domain: "warehouse",
  module: "packing",
  displayName: "Packing",
  routeBase: "/api/warehouse/packing",
  table: "warehouse_packing",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
