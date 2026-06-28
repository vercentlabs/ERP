export const manifest = {
  domain: "procurement",
  module: "suppliers",
  displayName: "Suppliers",
  routeBase: "/api/procurement/suppliers",
  table: "procurement_suppliers",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
