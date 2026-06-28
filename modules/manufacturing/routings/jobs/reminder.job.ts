export const routingsReminderJob = {
  name: "manufacturing/routings.reminder",
  queue: "manufacturing-routings",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
