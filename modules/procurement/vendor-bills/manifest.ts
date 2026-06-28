export const manifest = {
  domain: "procurement",
  module: "vendor-bills",
  displayName: "Vendor Bills",
  routeBase: "/api/procurement/vendor-bills",
  table: "procurement_vendor_bills",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
