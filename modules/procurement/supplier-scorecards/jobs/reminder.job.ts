export const supplierScorecardsReminderJob = {
  name: "procurement/supplier-scorecards.reminder",
  queue: "procurement-supplier-scorecards",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
