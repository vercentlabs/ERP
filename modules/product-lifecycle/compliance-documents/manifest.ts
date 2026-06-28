export const manifest = {
  domain: "product-lifecycle",
  module: "compliance-documents",
  displayName: "Compliance Documents",
  routeBase: "/api/product-lifecycle/compliance-documents",
  table: "product-lifecycle_compliance_documents",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
