export const locationsReminderJob = {
  name: "inventory/locations.reminder",
  queue: "inventory-locations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
