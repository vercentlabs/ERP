export const deductionsReminderJob = {
  name: "payroll/deductions.reminder",
  queue: "payroll-deductions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
