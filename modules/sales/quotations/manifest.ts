export const manifest = {
  domain: "sales",
  module: "quotations",
  displayName: "Quotations",
  routeBase: "/api/sales/quotations",
  table: "sales_quotations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["view", "create", "update", "delete", "change-status", "export", "print"],
  aiUseCases: ["summarize-commercial-risk", "recommend-follow-up", "detect-expiring-quotes"],
} as const;
