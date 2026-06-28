export const currencyMasterRecomputeJob = {
  name: "master-data/currency-master.recompute",
  queue: "master-data-currency-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
