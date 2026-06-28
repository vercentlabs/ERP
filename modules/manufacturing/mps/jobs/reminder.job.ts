export const mpsReminderJob = {
  name: "manufacturing/mps.reminder",
  queue: "manufacturing-mps",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
