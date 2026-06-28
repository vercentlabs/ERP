export const fieldInvoicingSyncJob = {
  name: "field-service/field-invoicing.sync",
  queue: "field-service-field-invoicing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
