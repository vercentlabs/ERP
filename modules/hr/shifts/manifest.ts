export const manifest = {
  domain: "hr",
  module: "shifts",
  displayName: "Shifts",
  routeBase: "/api/hr/shifts",
  table: "hr_shifts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
