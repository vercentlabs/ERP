export const invoicesRecomputeJob = {
  name: "sales/invoices.recompute",
  queue: "sales-invoices",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
