export const manifest = {
  domain: "data-platform",
  module: "bi-connectors",
  displayName: "Bi Connectors",
  routeBase: "/api/data-platform/bi-connectors",
  table: "data-platform_bi_connectors",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
