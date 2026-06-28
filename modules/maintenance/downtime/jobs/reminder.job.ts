export const downtimeReminderJob = {
  name: "maintenance/downtime.reminder",
  queue: "maintenance-downtime",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
