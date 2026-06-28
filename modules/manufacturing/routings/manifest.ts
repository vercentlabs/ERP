export const manifest = {
  domain: "manufacturing",
  module: "routings",
  displayName: "Routings",
  routeBase: "/api/manufacturing/routings",
  table: "manufacturing_routings",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
