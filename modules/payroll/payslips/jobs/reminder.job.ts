export const payslipsReminderJob = {
  name: "payroll/payslips.reminder",
  queue: "payroll-payslips",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
