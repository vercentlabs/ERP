export const manifest = {
  domain: "projects",
  module: "project-costing",
  displayName: "Project Costing",
  routeBase: "/api/projects/project-costing",
  table: "projects_project_costing",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
