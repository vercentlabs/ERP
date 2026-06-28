export const taxDeclarationsReminderJob = {
  name: "payroll/tax-declarations.reminder",
  queue: "payroll-tax-declarations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
