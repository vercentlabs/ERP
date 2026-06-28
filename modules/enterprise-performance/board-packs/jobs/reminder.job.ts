export const boardPacksReminderJob = {
  name: "enterprise-performance/board-packs.reminder",
  queue: "enterprise-performance-board-packs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
