export const manifest = {
  domain: "industry-packs",
  module: "retail",
  displayName: "Retail",
  routeBase: "/api/industry-packs/retail",
  table: "industry-packs_retail",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
