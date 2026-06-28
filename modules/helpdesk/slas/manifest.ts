export const manifest = {
  domain: "helpdesk",
  module: "slas",
  displayName: "Slas",
  routeBase: "/api/helpdesk/slas",
  table: "helpdesk_slas",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
