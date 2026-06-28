export const supplierPortalReminderJob = {
  name: "procurement/supplier-portal.reminder",
  queue: "procurement-supplier-portal",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
