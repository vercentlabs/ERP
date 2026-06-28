export const authReminderJob = {
  name: "platform/auth.reminder",
  queue: "platform-auth",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
