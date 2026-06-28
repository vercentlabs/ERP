export const taxMasterRecomputeJob = {
  name: "master-data/tax-master.recompute",
  queue: "master-data-tax-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
