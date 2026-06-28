export const manifest = {
  domain: "logistics",
  module: "transport-costing",
  displayName: "Transport Costing",
  routeBase: "/api/logistics/transport-costing",
  table: "logistics_transport_costing",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
