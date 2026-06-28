export const costCentersReminderJob = {
  name: "finance/cost-centers.reminder",
  queue: "finance-cost-centers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
