export const manifest = {
  domain: "compliance",
  module: "consent-management",
  displayName: "Consent Management",
  routeBase: "/api/compliance/consent-management",
  table: "compliance_consent_management",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
