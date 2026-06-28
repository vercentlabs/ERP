export const opportunitiesRecomputeJob = {
  name: "crm/opportunities.recompute",
  queue: "crm-opportunities",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
