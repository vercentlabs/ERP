export const manifest = {
  domain: "compliance",
  module: "controls",
  displayName: "Controls",
  routeBase: "/api/compliance/controls",
  table: "compliance_controls",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
