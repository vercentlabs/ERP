export const agentOrchestrationRecomputeJob = {
  name: "ai/agent-orchestration.recompute",
  queue: "ai-agent-orchestration",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
