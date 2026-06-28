export const benefitsReminderJob = {
  name: "payroll/benefits.reminder",
  queue: "payroll-benefits",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
