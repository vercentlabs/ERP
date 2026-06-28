export const maintenanceOrdersReminderJob = {
  name: "maintenance/maintenance-orders.reminder",
  queue: "maintenance-maintenance-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
