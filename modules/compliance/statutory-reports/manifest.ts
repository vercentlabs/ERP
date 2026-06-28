export const manifest = {
  domain: "compliance",
  module: "statutory-reports",
  displayName: "Statutory Reports",
  routeBase: "/api/compliance/statutory-reports",
  table: "compliance_statutory_reports",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
