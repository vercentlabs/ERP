export const shipmentsReminderJob = {
  name: "logistics/shipments.reminder",
  queue: "logistics-shipments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
