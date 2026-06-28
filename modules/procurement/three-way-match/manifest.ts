export const manifest = {
  domain: "procurement",
  module: "three-way-match",
  displayName: "Three Way Match",
  routeBase: "/api/procurement/three-way-match",
  table: "procurement_three_way_match",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
