export const manifest = {
  domain: "platform",
  module: "auth",
  displayName: "Auth",
  routeBase: "/api/platform/auth",
  table: "platform_auth",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
