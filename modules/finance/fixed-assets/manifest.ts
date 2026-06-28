export const manifest = {
  domain: "finance",
  module: "fixed-assets",
  displayName: "Fixed Assets",
  routeBase: "/api/finance/fixed-assets",
  table: "finance_fixed_assets",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
