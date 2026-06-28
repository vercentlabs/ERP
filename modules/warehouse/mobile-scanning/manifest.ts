export const manifest = {
  domain: "warehouse",
  module: "mobile-scanning",
  displayName: "Mobile Scanning",
  routeBase: "/api/warehouse/mobile-scanning",
  table: "warehouse_mobile_scanning",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
