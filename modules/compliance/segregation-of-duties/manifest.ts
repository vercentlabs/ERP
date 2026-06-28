export const manifest = {
  domain: "compliance",
  module: "segregation-of-duties",
  displayName: "Segregation Of Duties",
  routeBase: "/api/compliance/segregation-of-duties",
  table: "compliance_segregation_of_duties",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
