export const metricsLayerReminderJob = {
  name: "data-platform/metrics-layer.reminder",
  queue: "data-platform-metrics-layer",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
