export const manifest = {
  domain: "projects",
  module: "profitability",
  displayName: "Profitability",
  routeBase: "/api/projects/profitability",
  table: "projects_profitability",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
