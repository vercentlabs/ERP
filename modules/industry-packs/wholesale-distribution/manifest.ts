export const manifest = {
  domain: "industry-packs",
  module: "wholesale-distribution",
  displayName: "Wholesale Distribution",
  routeBase: "/api/industry-packs/wholesale-distribution",
  table: "industry-packs_wholesale_distribution",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
