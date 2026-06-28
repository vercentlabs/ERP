export const manifest = {
  domain: "field-service",
  module: "service-parts",
  displayName: "Service Parts",
  routeBase: "/api/field-service/service-parts",
  table: "field-service_service_parts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
