export const manifest = {
  domain: "industry-packs",
  module: "discrete-manufacturing",
  displayName: "Discrete Manufacturing",
  routeBase: "/api/industry-packs/discrete-manufacturing",
  table: "industry-packs_discrete_manufacturing",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
