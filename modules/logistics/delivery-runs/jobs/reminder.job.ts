export const deliveryRunsReminderJob = {
  name: "logistics/delivery-runs.reminder",
  queue: "logistics-delivery-runs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
