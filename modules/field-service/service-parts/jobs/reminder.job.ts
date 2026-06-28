export const servicePartsReminderJob = {
  name: "field-service/service-parts.reminder",
  queue: "field-service-service-parts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
