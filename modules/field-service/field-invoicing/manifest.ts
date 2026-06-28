export const manifest = {
  domain: "field-service",
  module: "field-invoicing",
  displayName: "Field Invoicing",
  routeBase: "/api/field-service/field-invoicing",
  table: "field-service_field_invoicing",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
