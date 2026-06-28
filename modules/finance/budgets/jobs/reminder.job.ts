export const budgetsReminderJob = {
  name: "finance/budgets.reminder",
  queue: "finance-budgets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
