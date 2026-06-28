export const manifest = {
  domain: "field-service",
  module: "mobile-jobs",
  displayName: "Mobile Jobs",
  routeBase: "/api/field-service/mobile-jobs",
  table: "field-service_mobile_jobs",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
