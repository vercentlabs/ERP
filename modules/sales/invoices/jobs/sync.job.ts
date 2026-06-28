export const invoicesSyncJob = {
  name: "sales/invoices.sync",
  queue: "sales-invoices",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
