export const budgetingReminderJob = {
  name: "enterprise-performance/budgeting.reminder",
  queue: "enterprise-performance-budgeting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
