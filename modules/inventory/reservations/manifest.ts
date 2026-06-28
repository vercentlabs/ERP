export const manifest = {
  domain: "inventory",
  module: "reservations",
  displayName: "Reservations",
  routeBase: "/api/inventory/reservations",
  table: "inventory_reservations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
