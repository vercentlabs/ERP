export const learningReminderJob = {
  name: "hr/learning.reminder",
  queue: "hr-learning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
