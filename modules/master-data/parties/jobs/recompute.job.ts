export const partiesRecomputeJob = {
  name: "master-data/parties.recompute",
  queue: "master-data-parties",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
