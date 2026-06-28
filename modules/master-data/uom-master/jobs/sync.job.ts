export const uomMasterSyncJob = {
  name: "master-data/uom-master.sync",
  queue: "master-data-uom-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
