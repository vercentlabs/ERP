export const manifest = {
  domain: "quality",
  module: "inspection-plans",
  displayName: "Inspection Plans",
  routeBase: "/api/quality/inspection-plans",
  table: "quality_inspection_plans",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
