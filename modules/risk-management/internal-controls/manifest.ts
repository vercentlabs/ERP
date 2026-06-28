export const manifest = {
  domain: "risk-management",
  module: "internal-controls",
  displayName: "Internal Controls",
  routeBase: "/api/risk-management/internal-controls",
  table: "risk-management_internal_controls",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
