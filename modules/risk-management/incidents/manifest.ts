export const manifest = {
  domain: "risk-management",
  module: "incidents",
  displayName: "Incidents",
  routeBase: "/api/risk-management/incidents",
  table: "risk-management_incidents",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
