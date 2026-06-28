export const semanticLayerSyncJob = {
  name: "data-platform/semantic-layer.sync",
  queue: "data-platform-semantic-layer",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
