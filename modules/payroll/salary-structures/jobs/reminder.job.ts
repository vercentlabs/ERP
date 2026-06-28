export const salaryStructuresReminderJob = {
  name: "payroll/salary-structures.reminder",
  queue: "payroll-salary-structures",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
