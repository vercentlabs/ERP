export const manifest = {
  domain: "platform",
  module: "documents",
  displayName: "Documents",
  routeBase: "/api/platform/documents",
  table: "platform_documents",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
