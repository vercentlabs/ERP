export const documentIntelligenceRecomputeJob = {
  name: "ai/document-intelligence.recompute",
  queue: "ai-document-intelligence",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
