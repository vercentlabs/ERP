export const usersReminderJob = {
  name: "platform/users.reminder",
  queue: "platform-users",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
