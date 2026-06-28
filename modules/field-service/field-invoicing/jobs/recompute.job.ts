export const fieldInvoicingRecomputeJob = {
  name: "field-service/field-invoicing.recompute",
  queue: "field-service-field-invoicing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
