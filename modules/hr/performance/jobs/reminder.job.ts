export const performanceReminderJob = {
  name: "hr/performance.reminder",
  queue: "hr-performance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
