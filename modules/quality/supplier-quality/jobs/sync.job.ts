export const supplierQualitySyncJob = {
  name: "quality/supplier-quality.sync",
  queue: "quality-supplier-quality",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
