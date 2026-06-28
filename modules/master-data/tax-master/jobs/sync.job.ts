export const taxMasterSyncJob = {
  name: "master-data/tax-master.sync",
  queue: "master-data-tax-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
