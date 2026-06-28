export const manifest = {
  domain: "projects",
  module: "resource-planning",
  displayName: "Resource Planning",
  routeBase: "/api/projects/resource-planning",
  table: "projects_resource_planning",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
