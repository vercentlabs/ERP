export const manifest = {
  domain: "ai",
  module: "erp-assistant",
  displayName: "Erp Assistant",
  routeBase: "/api/ai/erp-assistant",
  table: "ai_erp_assistant",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
