export const financialReportsReminderJob = {
  name: "finance/financial-reports.reminder",
  queue: "finance-financial-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
