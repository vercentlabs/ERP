export const accountingPeriodsReminderJob = {
  name: "finance/accounting-periods.reminder",
  queue: "finance-accounting-periods",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
