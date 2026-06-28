export const supplierPortalSyncJob = {
  name: "procurement/supplier-portal.sync",
  queue: "procurement-supplier-portal",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
