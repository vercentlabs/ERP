export const scrapReworkReminderJob = {
  name: "manufacturing/scrap-rework.reminder",
  queue: "manufacturing-scrap-rework",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
