export const manifest = {
  domain: "projects",
  module: "project-templates",
  displayName: "Project Templates",
  routeBase: "/api/projects/project-templates",
  table: "projects_project_templates",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
