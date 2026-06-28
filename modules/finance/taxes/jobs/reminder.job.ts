export const taxesReminderJob = {
  name: "finance/taxes.reminder",
  queue: "finance-taxes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
