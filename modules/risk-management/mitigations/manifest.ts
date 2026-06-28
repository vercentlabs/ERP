export const manifest = {
  domain: "risk-management",
  module: "mitigations",
  displayName: "Mitigations",
  routeBase: "/api/risk-management/mitigations",
  table: "risk-management_mitigations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
