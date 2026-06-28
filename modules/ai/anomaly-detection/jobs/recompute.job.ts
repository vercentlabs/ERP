export const anomalyDetectionRecomputeJob = {
  name: "ai/anomaly-detection.recompute",
  queue: "ai-anomaly-detection",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
