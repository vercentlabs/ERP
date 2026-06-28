export const metricsLayerSyncJob = {
  name: "data-platform/metrics-layer.sync",
  queue: "data-platform-metrics-layer",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
