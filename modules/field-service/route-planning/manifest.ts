export const manifest = {
  domain: "field-service",
  module: "route-planning",
  displayName: "Route Planning",
  routeBase: "/api/field-service/route-planning",
  table: "field-service_route_planning",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
