export const manifest = {
  domain: "data-platform",
  module: "event-streams",
  displayName: "Event Streams",
  routeBase: "/api/data-platform/event-streams",
  table: "data-platform_event_streams",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
