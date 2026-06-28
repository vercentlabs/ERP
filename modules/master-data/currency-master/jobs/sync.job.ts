export const currencyMasterSyncJob = {
  name: "master-data/currency-master.sync",
  queue: "master-data-currency-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
