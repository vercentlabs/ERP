export const payrollRunsReminderJob = {
  name: "payroll/payroll-runs.reminder",
  queue: "payroll-payroll-runs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
