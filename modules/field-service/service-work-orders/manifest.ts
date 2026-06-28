export const manifest = {
  domain: "field-service",
  module: "service-work-orders",
  displayName: "Service Work Orders",
  routeBase: "/api/field-service/service-work-orders",
  table: "field-service_service_work_orders",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
