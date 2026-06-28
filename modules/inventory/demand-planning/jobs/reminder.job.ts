export const demandPlanningReminderJob = {
  name: "inventory/demand-planning.reminder",
  queue: "inventory-demand-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
