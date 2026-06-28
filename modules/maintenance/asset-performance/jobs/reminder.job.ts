export const assetPerformanceReminderJob = {
  name: "maintenance/asset-performance.reminder",
  queue: "maintenance-asset-performance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
