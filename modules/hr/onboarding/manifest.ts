export const manifest = {
  domain: "hr",
  module: "onboarding",
  displayName: "Onboarding",
  routeBase: "/api/hr/onboarding",
  table: "hr_onboarding",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
