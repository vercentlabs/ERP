export const installedAppsReminderJob = {
  name: "integration-marketplace/installed-apps.reminder",
  queue: "integration-marketplace-installed-apps",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
