export const customerQualitySyncJob = {
  name: "quality/customer-quality.sync",
  queue: "quality-customer-quality",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
