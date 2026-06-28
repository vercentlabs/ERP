export const professionalServicesRecomputeJob = {
  name: "industry-packs/professional-services.recompute",
  queue: "industry-packs-professional-services",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
