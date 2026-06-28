export const carbonAccountingReminderJob = {
  name: "sustainability/carbon-accounting.reminder",
  queue: "sustainability-carbon-accounting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
