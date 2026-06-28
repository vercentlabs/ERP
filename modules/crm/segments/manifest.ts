export const manifest = {
  domain: "crm",
  module: "segments",
  displayName: "Segments",
  routeBase: "/api/crm/segments",
  table: "crm_segments",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
