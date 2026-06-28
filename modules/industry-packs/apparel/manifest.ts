export const manifest = {
  domain: "industry-packs",
  module: "apparel",
  displayName: "Apparel",
  routeBase: "/api/industry-packs/apparel",
  table: "industry-packs_apparel",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
