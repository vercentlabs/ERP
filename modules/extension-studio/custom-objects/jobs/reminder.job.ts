export const customObjectsReminderJob = {
  name: "extension-studio/custom-objects.reminder",
  queue: "extension-studio-custom-objects",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
