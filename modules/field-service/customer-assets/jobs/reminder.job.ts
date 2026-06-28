export const customerAssetsReminderJob = {
  name: "field-service/customer-assets.reminder",
  queue: "field-service-customer-assets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
