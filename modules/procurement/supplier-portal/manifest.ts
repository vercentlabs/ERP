export const manifest = {
  domain: "procurement",
  module: "supplier-portal",
  displayName: "Supplier Portal",
  routeBase: "/api/procurement/supplier-portal",
  table: "procurement_supplier_portal",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
