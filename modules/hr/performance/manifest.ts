export const manifest = {
  domain: "hr",
  module: "performance",
  displayName: "Performance",
  routeBase: "/api/hr/performance",
  table: "hr_performance",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
