export const notificationsReminderJob = {
  name: "platform/notifications.reminder",
  queue: "platform-notifications",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
