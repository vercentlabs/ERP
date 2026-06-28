export const manifest = {
  domain: "enterprise-performance",
  module: "board-packs",
  displayName: "Board Packs",
  routeBase: "/api/enterprise-performance/board-packs",
  table: "enterprise-performance_board_packs",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
