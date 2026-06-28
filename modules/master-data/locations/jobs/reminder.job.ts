export const locationsReminderJob = {
  name: "master-data/locations.reminder",
  queue: "master-data-locations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
