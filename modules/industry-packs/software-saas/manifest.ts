export const manifest = {
  domain: "industry-packs",
  module: "software-saas",
  displayName: "Software Saas",
  routeBase: "/api/industry-packs/software-saas",
  table: "industry-packs_software_saas",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
