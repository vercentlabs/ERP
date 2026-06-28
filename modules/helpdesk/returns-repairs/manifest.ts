export const manifest = {
  domain: "helpdesk",
  module: "returns-repairs",
  displayName: "Returns Repairs",
  routeBase: "/api/helpdesk/returns-repairs",
  table: "helpdesk_returns_repairs",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
