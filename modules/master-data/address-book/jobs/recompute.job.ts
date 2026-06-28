export const addressBookRecomputeJob = {
  name: "master-data/address-book.recompute",
  queue: "master-data-address-book",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
