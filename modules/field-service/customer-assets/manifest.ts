export const manifest = {
  domain: "field-service",
  module: "customer-assets",
  displayName: "Customer Assets",
  routeBase: "/api/field-service/customer-assets",
  table: "field-service_customer_assets",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
