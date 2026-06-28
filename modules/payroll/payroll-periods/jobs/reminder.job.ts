export const payrollPeriodsReminderJob = {
  name: "payroll/payroll-periods.reminder",
  queue: "payroll-payroll-periods",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
