export const preventiveMaintenanceReminderJob = {
  name: "maintenance/preventive-maintenance.reminder",
  queue: "maintenance-preventive-maintenance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
