export const manifest = {
  domain: "procurement",
  module: "procurement-policies",
  displayName: "Procurement Policies",
  routeBase: "/api/procurement/procurement-policies",
  table: "procurement_procurement_policies",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
