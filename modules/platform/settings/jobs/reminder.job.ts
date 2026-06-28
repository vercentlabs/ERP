export const settingsReminderJob = {
  name: "platform/settings.reminder",
  queue: "platform-settings",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
