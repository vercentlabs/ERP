export const manifest = {
  domain: "procurement",
  module: "landed-costs",
  displayName: "Landed Costs",
  routeBase: "/api/procurement/landed-costs",
  table: "procurement_landed_costs",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
