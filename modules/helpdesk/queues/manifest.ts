export const manifest = {
  domain: "helpdesk",
  module: "queues",
  displayName: "Queues",
  routeBase: "/api/helpdesk/queues",
  table: "helpdesk_queues",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
