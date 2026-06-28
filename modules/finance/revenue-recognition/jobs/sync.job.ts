export const revenueRecognitionSyncJob = {
  name: "finance/revenue-recognition.sync",
  queue: "finance-revenue-recognition",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
