export const localizationReminderJob = {
  name: "platform/localization.reminder",
  queue: "platform-localization",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
