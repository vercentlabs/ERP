export const deliveryNotesRecomputeJob = {
  name: "sales/delivery-notes.recompute",
  queue: "sales-delivery-notes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
