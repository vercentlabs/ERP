export const semanticLayerRecomputeJob = {
  name: "data-platform/semantic-layer.recompute",
  queue: "data-platform-semantic-layer",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
