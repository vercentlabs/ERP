export const equipmentReminderJob = {
  name: "maintenance/equipment.reminder",
  queue: "maintenance-equipment",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
