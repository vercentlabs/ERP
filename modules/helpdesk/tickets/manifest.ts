export const manifest = {
  domain: "helpdesk",
  module: "tickets",
  displayName: "Tickets",
  routeBase: "/api/helpdesk/tickets",
  table: "helpdesk_tickets",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
