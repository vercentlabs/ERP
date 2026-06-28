export const manifest = {
  domain: "industry-packs",
  module: "healthcare",
  displayName: "Healthcare",
  routeBase: "/api/industry-packs/healthcare",
  table: "industry-packs_healthcare",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
