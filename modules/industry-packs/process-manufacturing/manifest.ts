export const manifest = {
  domain: "industry-packs",
  module: "process-manufacturing",
  displayName: "Process Manufacturing",
  routeBase: "/api/industry-packs/process-manufacturing",
  table: "industry-packs_process_manufacturing",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
