export const accountsPayableReminderJob = {
  name: "finance/accounts-payable.reminder",
  queue: "finance-accounts-payable",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
