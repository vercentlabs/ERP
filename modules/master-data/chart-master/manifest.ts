export const manifest = {
  domain: "master-data",
  module: "chart-master",
  displayName: "Chart Master",
  routeBase: "/api/master-data/chart-master",
  table: "master-data_chart_master",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
