export const manifest = {
  domain: "field-service",
  module: "technicians",
  displayName: "Technicians",
  routeBase: "/api/field-service/technicians",
  table: "field-service_technicians",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
