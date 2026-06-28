export const manifest = {
  domain: "helpdesk",
  module: "service-analytics",
  displayName: "Service Analytics",
  routeBase: "/api/helpdesk/service-analytics",
  table: "helpdesk_service_analytics",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
