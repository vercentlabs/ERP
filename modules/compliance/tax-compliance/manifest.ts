export const manifest = {
  domain: "compliance",
  module: "tax-compliance",
  displayName: "Tax Compliance",
  routeBase: "/api/compliance/tax-compliance",
  table: "compliance_tax_compliance",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
