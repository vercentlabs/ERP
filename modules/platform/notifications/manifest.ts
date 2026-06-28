export const manifest = {
  domain: "platform",
  module: "notifications",
  displayName: "Notifications",
  routeBase: "/api/platform/notifications",
  table: "platform_notifications",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
