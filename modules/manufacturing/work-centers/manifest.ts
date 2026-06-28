export const manifest = {
  domain: "manufacturing",
  module: "work-centers",
  displayName: "Work Centers",
  routeBase: "/api/manufacturing/work-centers",
  table: "manufacturing_work_centers",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
