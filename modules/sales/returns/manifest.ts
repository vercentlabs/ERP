export const manifest = {
  domain: "sales",
  module: "returns",
  displayName: "Returns",
  routeBase: "/api/sales/returns",
  table: "sales_returns",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
