export const consolidationReminderJob = {
  name: "finance/consolidation.reminder",
  queue: "finance-consolidation",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
