export const manifest = {
  domain: "projects",
  module: "projects",
  displayName: "Projects",
  routeBase: "/api/projects/projects",
  table: "projects_projects",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
