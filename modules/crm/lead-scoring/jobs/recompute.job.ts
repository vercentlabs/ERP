export const leadScoringRecomputeJob = {
  name: "crm/lead-scoring.recompute",
  queue: "crm-lead-scoring",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
