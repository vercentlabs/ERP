export const manifest = {
  domain: "hr",
  module: "recruitment",
  displayName: "Recruitment",
  routeBase: "/api/hr/recruitment",
  table: "hr_recruitment",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
