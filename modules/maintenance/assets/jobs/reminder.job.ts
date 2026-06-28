export const assetsReminderJob = {
  name: "maintenance/assets.reminder",
  queue: "maintenance-assets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
