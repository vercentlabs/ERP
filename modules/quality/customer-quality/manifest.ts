export const manifest = {
  domain: "quality",
  module: "customer-quality",
  displayName: "Customer Quality",
  routeBase: "/api/quality/customer-quality",
  table: "quality_customer_quality",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
