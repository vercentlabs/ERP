export const customLayoutsReminderJob = {
  name: "platform/custom-layouts.reminder",
  queue: "platform-custom-layouts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
