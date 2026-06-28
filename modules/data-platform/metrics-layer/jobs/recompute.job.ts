export const metricsLayerRecomputeJob = {
  name: "data-platform/metrics-layer.recompute",
  queue: "data-platform-metrics-layer",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
