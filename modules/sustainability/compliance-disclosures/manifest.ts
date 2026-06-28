export const manifest = {
  domain: "sustainability",
  module: "compliance-disclosures",
  displayName: "Compliance Disclosures",
  routeBase: "/api/sustainability/compliance-disclosures",
  table: "sustainability_compliance_disclosures",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
