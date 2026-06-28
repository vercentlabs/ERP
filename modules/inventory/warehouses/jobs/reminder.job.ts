export const warehousesReminderJob = {
  name: "inventory/warehouses.reminder",
  queue: "inventory-warehouses",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
