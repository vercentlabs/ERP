export const serviceWorkOrdersReminderJob = {
  name: "field-service/service-work-orders.reminder",
  queue: "field-service-service-work-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
