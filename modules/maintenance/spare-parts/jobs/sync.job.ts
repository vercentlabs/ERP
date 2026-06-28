export const sparePartsSyncJob = {
  name: "maintenance/spare-parts.sync",
  queue: "maintenance-spare-parts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
