export const manifest = {
  domain: "inventory",
  module: "serial-batches",
  displayName: "Serial Batches",
  routeBase: "/api/inventory/serial-batches",
  table: "inventory_serial_batches",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
