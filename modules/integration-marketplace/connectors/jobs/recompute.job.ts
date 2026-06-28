export const connectorsRecomputeJob = {
  name: "integration-marketplace/connectors.recompute",
  queue: "integration-marketplace-connectors",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
