export const manifest = {
  domain: "sustainability",
  module: "sustainability-reports",
  displayName: "Sustainability Reports",
  routeBase: "/api/sustainability/sustainability-reports",
  table: "sustainability_sustainability_reports",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
