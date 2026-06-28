export const journalsRecomputeJob = {
  name: "finance/journals.recompute",
  queue: "finance-journals",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
