export const operationalDataStoreRecomputeJob = {
  name: "data-platform/operational-data-store.recompute",
  queue: "data-platform-operational-data-store",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
