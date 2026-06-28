export const manifest = {
  domain: "industry-packs",
  module: "automotive",
  displayName: "Automotive",
  routeBase: "/api/industry-packs/automotive",
  table: "industry-packs_automotive",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
