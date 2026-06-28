export const manifest = {
  domain: "warehouse",
  module: "bins",
  displayName: "Bins",
  routeBase: "/api/warehouse/bins",
  table: "warehouse_bins",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
