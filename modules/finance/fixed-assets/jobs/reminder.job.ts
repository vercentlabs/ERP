export const fixedAssetsReminderJob = {
  name: "finance/fixed-assets.reminder",
  queue: "finance-fixed-assets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
