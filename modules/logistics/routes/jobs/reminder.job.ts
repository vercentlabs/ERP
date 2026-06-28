export const routesReminderJob = {
  name: "logistics/routes.reminder",
  queue: "logistics-routes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
