export const manifest = {
  domain: "projects",
  module: "milestones",
  displayName: "Milestones",
  routeBase: "/api/projects/milestones",
  table: "projects_milestones",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
