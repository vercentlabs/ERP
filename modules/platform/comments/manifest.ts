export const manifest = {
  domain: "platform",
  module: "comments",
  displayName: "Comments",
  routeBase: "/api/platform/comments",
  table: "platform_comments",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
