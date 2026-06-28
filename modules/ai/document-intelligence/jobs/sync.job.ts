export const documentIntelligenceSyncJob = {
  name: "ai/document-intelligence.sync",
  queue: "ai-document-intelligence",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
