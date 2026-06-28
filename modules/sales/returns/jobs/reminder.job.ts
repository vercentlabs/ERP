export const returnsReminderJob = {
  name: "sales/returns.reminder",
  queue: "sales-returns",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
