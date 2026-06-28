export const anomalyDetectionReminderJob = {
  name: "ai/anomaly-detection.reminder",
  queue: "ai-anomaly-detection",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
