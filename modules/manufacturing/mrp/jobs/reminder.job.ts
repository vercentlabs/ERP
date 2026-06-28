export const mrpReminderJob = {
  name: "manufacturing/mrp.reminder",
  queue: "manufacturing-mrp",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
