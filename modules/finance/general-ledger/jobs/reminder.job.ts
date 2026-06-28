export const generalLedgerReminderJob = {
  name: "finance/general-ledger.reminder",
  queue: "finance-general-ledger",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
