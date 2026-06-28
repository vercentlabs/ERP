export const emissionsRecomputeJob = {
  name: "sustainability/emissions.recompute",
  queue: "sustainability-emissions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
