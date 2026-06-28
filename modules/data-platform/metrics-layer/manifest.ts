export const manifest = {
  domain: "data-platform",
  module: "metrics-layer",
  displayName: "Metrics Layer",
  routeBase: "/api/data-platform/metrics-layer",
  table: "data-platform_metrics_layer",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
