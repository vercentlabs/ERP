export const manifest = {
  domain: "integration-marketplace",
  module: "installed-apps",
  displayName: "Installed Apps",
  routeBase: "/api/integration-marketplace/installed-apps",
  table: "integration-marketplace_installed_apps",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
