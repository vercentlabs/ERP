export const billOfMaterialsSyncJob = {
  name: "manufacturing/bill-of-materials.sync",
  queue: "manufacturing-bill-of-materials",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
