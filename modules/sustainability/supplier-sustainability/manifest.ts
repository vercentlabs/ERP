export const manifest = {
  domain: "sustainability",
  module: "supplier-sustainability",
  displayName: "Supplier Sustainability",
  routeBase: "/api/sustainability/supplier-sustainability",
  table: "sustainability_supplier_sustainability",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
