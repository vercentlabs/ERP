export const customPagesReminderJob = {
  name: "extension-studio/custom-pages.reminder",
  queue: "extension-studio-custom-pages",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
