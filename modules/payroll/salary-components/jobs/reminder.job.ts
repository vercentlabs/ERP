export const salaryComponentsReminderJob = {
  name: "payroll/salary-components.reminder",
  queue: "payroll-salary-components",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
