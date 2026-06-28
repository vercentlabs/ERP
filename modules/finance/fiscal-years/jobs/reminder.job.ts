export const fiscalYearsReminderJob = {
  name: "finance/fiscal-years.reminder",
  queue: "finance-fiscal-years",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
