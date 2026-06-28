export const discreteManufacturingRecomputeJob = {
  name: "industry-packs/discrete-manufacturing.recompute",
  queue: "industry-packs-discrete-manufacturing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
