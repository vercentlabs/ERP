export const loansAdvancesReminderJob = {
  name: "payroll/loans-advances.reminder",
  queue: "payroll-loans-advances",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
