export const quotationsSyncJob = {
  name: "sales/quotations.sync",
  queue: "sales-quotations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
