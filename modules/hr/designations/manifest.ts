export const manifest = {
  domain: "hr",
  module: "designations",
  displayName: "Designations",
  routeBase: "/api/hr/designations",
  table: "hr_designations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
