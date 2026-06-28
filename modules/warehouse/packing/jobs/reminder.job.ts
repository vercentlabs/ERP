export const packingReminderJob = {
  name: "warehouse/packing.reminder",
  queue: "warehouse-packing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
