export const accountingPostingReminderJob = {
  name: "payroll/accounting-posting.reminder",
  queue: "payroll-accounting-posting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
