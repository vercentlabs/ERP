export const permissions = {
  read: "ai/agent-orchestration:read",
  create: "ai/agent-orchestration:create",
  update: "ai/agent-orchestration:update",
  submit: "ai/agent-orchestration:submit",
  approve: "ai/agent-orchestration:approve",
  reject: "ai/agent-orchestration:reject",
  cancel: "ai/agent-orchestration:cancel",
  close: "ai/agent-orchestration:close",
  report: "ai/agent-orchestration:report",
} as const;

export type AgentOrchestrationPermission = (typeof permissions)[keyof typeof permissions];
