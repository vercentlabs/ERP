export const manifest = {
  domain: "ai",
  module: "agent-orchestration",
  displayName: "Agent Orchestration",
  routeBase: "/api/ai/agent-orchestration",
  table: "ai_agent_orchestration",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
