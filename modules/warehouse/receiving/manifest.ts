export const manifest = {
  domain: "warehouse",
  module: "receiving",
  displayName: "Receiving",
  routeBase: "/api/warehouse/receiving",
  table: "warehouse_receiving",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
