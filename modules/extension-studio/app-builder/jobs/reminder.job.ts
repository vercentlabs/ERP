export const appBuilderReminderJob = {
  name: "extension-studio/app-builder.reminder",
  queue: "extension-studio-app-builder",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
