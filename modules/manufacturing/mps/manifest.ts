export const manifest = {
  domain: "manufacturing",
  module: "mps",
  displayName: "Mps",
  routeBase: "/api/manufacturing/mps",
  table: "manufacturing_mps",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
