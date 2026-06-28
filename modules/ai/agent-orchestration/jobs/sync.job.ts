export const agentOrchestrationSyncJob = {
  name: "ai/agent-orchestration.sync",
  queue: "ai-agent-orchestration",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
