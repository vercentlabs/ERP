export const manifest = {
  domain: "projects",
  module: "project-expenses",
  displayName: "Project Expenses",
  routeBase: "/api/projects/project-expenses",
  table: "projects_project_expenses",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
