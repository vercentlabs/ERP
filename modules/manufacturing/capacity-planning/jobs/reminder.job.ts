export const capacityPlanningReminderJob = {
  name: "manufacturing/capacity-planning.reminder",
  queue: "manufacturing-capacity-planning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
