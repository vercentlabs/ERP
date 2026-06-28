export const manifest = {
  domain: "compliance",
  module: "certifications",
  displayName: "Certifications",
  routeBase: "/api/compliance/certifications",
  table: "compliance_certifications",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
