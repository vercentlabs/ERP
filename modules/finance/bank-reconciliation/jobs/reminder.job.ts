export const bankReconciliationReminderJob = {
  name: "finance/bank-reconciliation.reminder",
  queue: "finance-bank-reconciliation",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
