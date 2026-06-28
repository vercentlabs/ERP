export const manifest = {
  domain: "projects",
  module: "project-billing",
  displayName: "Project Billing",
  routeBase: "/api/projects/project-billing",
  table: "projects_project_billing",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
