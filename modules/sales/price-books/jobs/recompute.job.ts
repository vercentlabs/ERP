export const priceBooksRecomputeJob = {
  name: "sales/price-books.recompute",
  queue: "sales-price-books",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
