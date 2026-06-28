export const carriersReminderJob = {
  name: "logistics/carriers.reminder",
  queue: "logistics-carriers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
