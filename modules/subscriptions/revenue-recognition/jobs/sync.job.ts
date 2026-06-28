export const revenueRecognitionSyncJob = {
  name: "subscriptions/revenue-recognition.sync",
  queue: "subscriptions-revenue-recognition",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
