export const uomMasterRecomputeJob = {
  name: "master-data/uom-master.recompute",
  queue: "master-data-uom-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
