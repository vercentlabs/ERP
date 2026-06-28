export const customerQualityReminderJob = {
  name: "quality/customer-quality.reminder",
  queue: "quality-customer-quality",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
