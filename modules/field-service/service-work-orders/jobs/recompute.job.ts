export const serviceWorkOrdersRecomputeJob = {
  name: "field-service/service-work-orders.recompute",
  queue: "field-service-service-work-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
