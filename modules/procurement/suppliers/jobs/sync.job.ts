export const suppliersSyncJob = {
  name: "procurement/suppliers.sync",
  queue: "procurement-suppliers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
