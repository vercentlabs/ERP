export const correctiveActionsRecomputeJob = {
  name: "quality/corrective-actions.recompute",
  queue: "quality-corrective-actions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
