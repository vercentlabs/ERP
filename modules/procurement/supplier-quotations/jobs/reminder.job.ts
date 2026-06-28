export const supplierQuotationsReminderJob = {
  name: "procurement/supplier-quotations.reminder",
  queue: "procurement-supplier-quotations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
