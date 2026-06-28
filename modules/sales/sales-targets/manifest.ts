export const manifest = {
  domain: "sales",
  module: "sales-targets",
  displayName: "Sales Targets",
  routeBase: "/api/sales/sales-targets",
  table: "sales_sales_targets",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
