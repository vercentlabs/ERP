export const servicePartsRecomputeJob = {
  name: "field-service/service-parts.recompute",
  queue: "field-service-service-parts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
