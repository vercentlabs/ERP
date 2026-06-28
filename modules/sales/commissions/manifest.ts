export const manifest = {
  domain: "sales",
  module: "commissions",
  displayName: "Commissions",
  routeBase: "/api/sales/commissions",
  table: "sales_commissions",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
