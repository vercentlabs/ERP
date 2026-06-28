export const planningReminderJob = {
  name: "enterprise-performance/planning.reminder",
  queue: "enterprise-performance-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
