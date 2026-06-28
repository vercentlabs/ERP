export const invoicesReminderJob = {
  name: "sales/invoices.reminder",
  queue: "sales-invoices",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
