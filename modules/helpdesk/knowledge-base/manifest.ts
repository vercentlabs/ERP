export const manifest = {
  domain: "helpdesk",
  module: "knowledge-base",
  displayName: "Knowledge Base",
  routeBase: "/api/helpdesk/knowledge-base",
  table: "helpdesk_knowledge_base",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
