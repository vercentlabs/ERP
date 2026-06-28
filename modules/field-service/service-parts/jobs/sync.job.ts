export const servicePartsSyncJob = {
  name: "field-service/service-parts.sync",
  queue: "field-service-service-parts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
