export const profitCentersReminderJob = {
  name: "finance/profit-centers.reminder",
  queue: "finance-profit-centers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
