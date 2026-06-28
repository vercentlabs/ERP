export const creditNotesRecomputeJob = {
  name: "sales/credit-notes.recompute",
  queue: "sales-credit-notes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
