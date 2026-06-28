export const manifest = {
  domain: "procurement",
  module: "rfqs",
  displayName: "Rfqs",
  routeBase: "/api/procurement/rfqs",
  table: "procurement_rfqs",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
