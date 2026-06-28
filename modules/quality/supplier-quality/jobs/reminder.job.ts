export const supplierQualityReminderJob = {
  name: "quality/supplier-quality.reminder",
  queue: "quality-supplier-quality",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
