export const manifest = {
  domain: "industry-packs",
  module: "professional-services",
  displayName: "Professional Services",
  routeBase: "/api/industry-packs/professional-services",
  table: "industry-packs_professional_services",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
