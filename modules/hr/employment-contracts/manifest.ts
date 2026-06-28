export const manifest = {
  domain: "hr",
  module: "employment-contracts",
  displayName: "Employment Contracts",
  routeBase: "/api/hr/employment-contracts",
  table: "hr_employment_contracts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
