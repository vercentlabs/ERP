export const periodCloseReminderJob = {
  name: "finance/period-close.reminder",
  queue: "finance-period-close",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
