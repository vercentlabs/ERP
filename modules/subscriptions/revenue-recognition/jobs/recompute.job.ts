export const revenueRecognitionRecomputeJob = {
  name: "subscriptions/revenue-recognition.recompute",
  queue: "subscriptions-revenue-recognition",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
