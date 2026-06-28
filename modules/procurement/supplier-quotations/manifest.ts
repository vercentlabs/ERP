export const manifest = {
  domain: "procurement",
  module: "supplier-quotations",
  displayName: "Supplier Quotations",
  routeBase: "/api/procurement/supplier-quotations",
  table: "procurement_supplier_quotations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
