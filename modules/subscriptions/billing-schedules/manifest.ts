export const manifest = {
  domain: "subscriptions",
  module: "billing-schedules",
  displayName: "Billing Schedules",
  routeBase: "/api/subscriptions/billing-schedules",
  table: "subscriptions_billing_schedules",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
