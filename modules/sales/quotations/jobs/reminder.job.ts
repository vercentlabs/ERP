export const quotationsReminderJob = {
  name: "sales/quotations.reminder",
  queue: "sales-quotations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
