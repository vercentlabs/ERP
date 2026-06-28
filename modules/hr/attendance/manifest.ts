export const manifest = {
  domain: "hr",
  module: "attendance",
  displayName: "Attendance",
  routeBase: "/api/hr/attendance",
  table: "hr_attendance",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
