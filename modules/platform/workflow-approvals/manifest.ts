export const manifest = {
  domain: "platform",
  module: "workflow-approvals",
  displayName: "Workflow Approvals",
  routeBase: "/api/platform/workflow-approvals",
  table: "platform_workflow_approvals",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
