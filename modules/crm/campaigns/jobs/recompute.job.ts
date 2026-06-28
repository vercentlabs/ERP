export const campaignsRecomputeJob = {
  name: "crm/campaigns.recompute",
  queue: "crm-campaigns",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
