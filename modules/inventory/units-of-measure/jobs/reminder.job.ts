export const unitsOfMeasureReminderJob = {
  name: "inventory/units-of-measure.reminder",
  queue: "inventory-units-of-measure",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
