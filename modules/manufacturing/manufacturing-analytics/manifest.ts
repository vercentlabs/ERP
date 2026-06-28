export const manifest = {
  domain: "manufacturing",
  module: "manufacturing-analytics",
  displayName: "Manufacturing Analytics",
  routeBase: "/api/manufacturing/manufacturing-analytics",
  table: "manufacturing_manufacturing_analytics",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
