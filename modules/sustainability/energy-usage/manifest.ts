export const manifest = {
  domain: "sustainability",
  module: "energy-usage",
  displayName: "Energy Usage",
  routeBase: "/api/sustainability/energy-usage",
  table: "sustainability_energy_usage",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
