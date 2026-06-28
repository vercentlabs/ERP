export const priceBooksSyncJob = {
  name: "sales/price-books.sync",
  queue: "sales-price-books",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
