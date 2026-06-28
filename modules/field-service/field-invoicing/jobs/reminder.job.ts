export const fieldInvoicingReminderJob = {
  name: "field-service/field-invoicing.reminder",
  queue: "field-service-field-invoicing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
