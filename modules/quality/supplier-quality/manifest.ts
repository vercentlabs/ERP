export const manifest = {
  domain: "quality",
  module: "supplier-quality",
  displayName: "Supplier Quality",
  routeBase: "/api/quality/supplier-quality",
  table: "quality_supplier_quality",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
