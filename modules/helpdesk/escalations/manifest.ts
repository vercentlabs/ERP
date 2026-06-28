export const manifest = {
  domain: "helpdesk",
  module: "escalations",
  displayName: "Escalations",
  routeBase: "/api/helpdesk/escalations",
  table: "helpdesk_escalations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
