export const manifest = {
  domain: "hr",
  module: "leave",
  displayName: "Leave",
  routeBase: "/api/hr/leave",
  table: "hr_leave",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
