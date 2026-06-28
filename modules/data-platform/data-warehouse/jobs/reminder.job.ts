export const dataWarehouseReminderJob = {
  name: "data-platform/data-warehouse.reminder",
  queue: "data-platform-data-warehouse",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
