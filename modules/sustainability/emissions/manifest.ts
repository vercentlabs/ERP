export const manifest = {
  domain: "sustainability",
  module: "emissions",
  displayName: "Emissions",
  routeBase: "/api/sustainability/emissions",
  table: "sustainability_emissions",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
