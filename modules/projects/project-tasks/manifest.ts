export const manifest = {
  domain: "projects",
  module: "project-tasks",
  displayName: "Project Tasks",
  routeBase: "/api/projects/project-tasks",
  table: "projects_project_tasks",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
