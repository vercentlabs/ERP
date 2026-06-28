export const anomalyDetectionSyncJob = {
  name: "ai/anomaly-detection.sync",
  queue: "ai-anomaly-detection",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
