export const manifest = {
  domain: "platform",
  module: "companies",
  displayName: "Companies",
  routeBase: "/api/platform/companies",
  table: "platform_companies",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
