export const dockManagementReminderJob = {
  name: "warehouse/dock-management.reminder",
  queue: "warehouse-dock-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
