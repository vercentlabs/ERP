export const chartMasterSyncJob = {
  name: "master-data/chart-master.sync",
  queue: "master-data-chart-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
