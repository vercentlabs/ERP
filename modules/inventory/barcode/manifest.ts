export const manifest = {
  domain: "inventory",
  module: "barcode",
  displayName: "Barcode",
  routeBase: "/api/inventory/barcode",
  table: "inventory_barcode",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
