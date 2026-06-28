export const replenishmentTasksReminderJob = {
  name: "warehouse/replenishment-tasks.reminder",
  queue: "warehouse-replenishment-tasks",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
