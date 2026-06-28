export const manifest = {
  domain: "ai",
  module: "workflow-recommendations",
  displayName: "Workflow Recommendations",
  routeBase: "/api/ai/workflow-recommendations",
  table: "ai_workflow_recommendations",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
