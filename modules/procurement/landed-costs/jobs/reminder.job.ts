export const landedCostsReminderJob = {
  name: "procurement/landed-costs.reminder",
  queue: "procurement-landed-costs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
