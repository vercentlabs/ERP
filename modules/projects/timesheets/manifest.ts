export const manifest = {
  domain: "projects",
  module: "timesheets",
  displayName: "Timesheets",
  routeBase: "/api/projects/timesheets",
  table: "projects_timesheets",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
