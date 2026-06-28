export const processManufacturingRecomputeJob = {
  name: "industry-packs/process-manufacturing.recompute",
  queue: "industry-packs-process-manufacturing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
