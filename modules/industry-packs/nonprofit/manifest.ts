export const manifest = {
  domain: "industry-packs",
  module: "nonprofit",
  displayName: "Nonprofit",
  routeBase: "/api/industry-packs/nonprofit",
  table: "industry-packs_nonprofit",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
