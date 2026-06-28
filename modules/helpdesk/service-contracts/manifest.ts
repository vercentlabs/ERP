export const manifest = {
  domain: "helpdesk",
  module: "service-contracts",
  displayName: "Service Contracts",
  routeBase: "/api/helpdesk/service-contracts",
  table: "helpdesk_service_contracts",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
