export const manifest = {
  domain: "manufacturing",
  module: "mrp",
  displayName: "Mrp",
  routeBase: "/api/manufacturing/mrp",
  table: "manufacturing_mrp",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
