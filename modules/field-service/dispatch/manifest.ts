export const manifest = {
  domain: "field-service",
  module: "dispatch",
  displayName: "Dispatch",
  routeBase: "/api/field-service/dispatch",
  table: "field-service_dispatch",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
