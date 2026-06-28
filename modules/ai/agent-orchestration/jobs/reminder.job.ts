export const agentOrchestrationReminderJob = {
  name: "ai/agent-orchestration.reminder",
  queue: "ai-agent-orchestration",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
