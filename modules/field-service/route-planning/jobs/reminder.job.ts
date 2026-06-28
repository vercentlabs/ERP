export const routePlanningReminderJob = {
  name: "field-service/route-planning.reminder",
  queue: "field-service-route-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
