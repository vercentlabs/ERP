export const manifest = {
  domain: "compliance",
  module: "data-retention",
  displayName: "Data Retention",
  routeBase: "/api/compliance/data-retention",
  table: "compliance_data_retention",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
