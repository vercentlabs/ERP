export const accountsReceivableReminderJob = {
  name: "finance/accounts-receivable.reminder",
  queue: "finance-accounts-receivable",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
