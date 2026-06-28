export const manifest = {
  domain: "industry-packs",
  module: "education",
  displayName: "Education",
  routeBase: "/api/industry-packs/education",
  table: "industry-packs_education",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
