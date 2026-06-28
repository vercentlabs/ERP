export const mobileScanningReminderJob = {
  name: "warehouse/mobile-scanning.reminder",
  queue: "warehouse-mobile-scanning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
