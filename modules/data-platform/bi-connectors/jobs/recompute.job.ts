export const biConnectorsRecomputeJob = {
  name: "data-platform/bi-connectors.recompute",
  queue: "data-platform-bi-connectors",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
