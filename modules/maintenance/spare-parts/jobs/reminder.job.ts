export const sparePartsReminderJob = {
  name: "maintenance/spare-parts.reminder",
  queue: "maintenance-spare-parts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
