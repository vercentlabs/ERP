export const manifest = {
  domain: "quality",
  module: "quality-certificates",
  displayName: "Quality Certificates",
  routeBase: "/api/quality/quality-certificates",
  table: "quality_quality_certificates",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
