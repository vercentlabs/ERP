export const manifest = {
  domain: "data-platform",
  module: "semantic-layer",
  displayName: "Semantic Layer",
  routeBase: "/api/data-platform/semantic-layer",
  table: "data-platform_semantic_layer",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
