export const workCentersReminderJob = {
  name: "manufacturing/work-centers.reminder",
  queue: "manufacturing-work-centers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
