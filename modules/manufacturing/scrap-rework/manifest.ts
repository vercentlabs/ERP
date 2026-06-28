export const manifest = {
  domain: "manufacturing",
  module: "scrap-rework",
  displayName: "Scrap Rework",
  routeBase: "/api/manufacturing/scrap-rework",
  table: "manufacturing_scrap_rework",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
