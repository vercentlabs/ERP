export const erpAssistantRecomputeJob = {
  name: "ai/erp-assistant.recompute",
  queue: "ai-erp-assistant",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
