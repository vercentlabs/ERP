export const leadsRecomputeJob = {
  name: "crm/leads.recompute",
  queue: "crm-leads",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
