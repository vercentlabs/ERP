export const manifest = {
  domain: "manufacturing",
  module: "capacity-planning",
  displayName: "Capacity Planning",
  routeBase: "/api/manufacturing/capacity-planning",
  table: "manufacturing_capacity_planning",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
