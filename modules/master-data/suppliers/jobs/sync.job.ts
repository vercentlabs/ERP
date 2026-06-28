export const suppliersSyncJob = {
  name: "master-data/suppliers.sync",
  queue: "master-data-suppliers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
