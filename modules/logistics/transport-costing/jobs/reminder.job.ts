export const transportCostingReminderJob = {
  name: "logistics/transport-costing.reminder",
  queue: "logistics-transport-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
