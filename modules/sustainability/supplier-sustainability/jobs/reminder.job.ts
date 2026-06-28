export const supplierSustainabilityReminderJob = {
  name: "sustainability/supplier-sustainability.reminder",
  queue: "sustainability-supplier-sustainability",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
