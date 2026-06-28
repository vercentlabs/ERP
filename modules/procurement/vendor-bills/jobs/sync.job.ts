export const vendorBillsSyncJob = {
  name: "procurement/vendor-bills.sync",
  queue: "procurement-vendor-bills",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
