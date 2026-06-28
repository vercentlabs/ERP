export const shopFloorReminderJob = {
  name: "manufacturing/shop-floor.reminder",
  queue: "manufacturing-shop-floor",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
