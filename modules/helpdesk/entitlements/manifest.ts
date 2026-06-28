export const manifest = {
  domain: "helpdesk",
  module: "entitlements",
  displayName: "Entitlements",
  routeBase: "/api/helpdesk/entitlements",
  table: "helpdesk_entitlements",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
