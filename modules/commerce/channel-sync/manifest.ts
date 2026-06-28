export const manifest = {
  domain: "commerce",
  module: "channel-sync",
  displayName: "Channel Sync",
  routeBase: "/api/commerce/channel-sync",
  table: "commerce_channel_sync",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
