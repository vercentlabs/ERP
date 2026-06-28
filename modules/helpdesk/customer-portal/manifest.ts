export const manifest = {
  domain: "helpdesk",
  module: "customer-portal",
  displayName: "Customer Portal",
  routeBase: "/api/helpdesk/customer-portal",
  table: "helpdesk_customer_portal",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
