export const manifest = {
  domain: "finance",
  module: "journals",
  displayName: "Journals",
  routeBase: "/api/finance/journals",
  table: "finance_journals",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
