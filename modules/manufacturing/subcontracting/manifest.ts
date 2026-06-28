export const manifest = {
  domain: "manufacturing",
  module: "subcontracting",
  displayName: "Subcontracting",
  routeBase: "/api/manufacturing/subcontracting",
  table: "manufacturing_subcontracting",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
