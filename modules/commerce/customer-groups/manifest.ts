export const manifest = {
  domain: "commerce",
  module: "customer-groups",
  displayName: "Customer Groups",
  routeBase: "/api/commerce/customer-groups",
  table: "commerce_customer_groups",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
