export const revenueRecognitionRecomputeJob = {
  name: "finance/revenue-recognition.recompute",
  queue: "finance-revenue-recognition",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
