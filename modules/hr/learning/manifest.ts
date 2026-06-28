export const manifest = {
  domain: "hr",
  module: "learning",
  displayName: "Learning",
  routeBase: "/api/hr/learning",
  table: "hr_learning",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
