export const chartMasterRecomputeJob = {
  name: "master-data/chart-master.recompute",
  queue: "master-data-chart-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
