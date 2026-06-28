export const blanketOrdersReminderJob = {
  name: "procurement/blanket-orders.reminder",
  queue: "procurement-blanket-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
