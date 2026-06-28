export const manifest = {
  domain: "ai",
  module: "document-intelligence",
  displayName: "Document Intelligence",
  routeBase: "/api/ai/document-intelligence",
  table: "ai_document_intelligence",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
