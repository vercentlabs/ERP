export const supplierQuotationsSyncJob = {
  name: "procurement/supplier-quotations.sync",
  queue: "procurement-supplier-quotations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
