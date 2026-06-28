export const manifest = {
  domain: "industry-packs",
  module: "construction",
  displayName: "Construction",
  routeBase: "/api/industry-packs/construction",
  table: "industry-packs_construction",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
