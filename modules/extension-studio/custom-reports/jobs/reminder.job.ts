export const customReportsReminderJob = {
  name: "extension-studio/custom-reports.reminder",
  queue: "extension-studio-custom-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
