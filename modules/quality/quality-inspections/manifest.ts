export const manifest = {
  domain: "quality",
  module: "quality-inspections",
  displayName: "Quality Inspections",
  routeBase: "/api/quality/quality-inspections",
  table: "quality_quality_inspections",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
