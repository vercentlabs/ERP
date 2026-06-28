export const manifest = {
  domain: "procurement",
  module: "supplier-scorecards",
  displayName: "Supplier Scorecards",
  routeBase: "/api/procurement/supplier-scorecards",
  table: "procurement_supplier_scorecards",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
