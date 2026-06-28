export const serviceWorkOrdersSyncJob = {
  name: "field-service/service-work-orders.sync",
  queue: "field-service-service-work-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
