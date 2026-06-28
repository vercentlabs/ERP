export const subLedgersReminderJob = {
  name: "finance/sub-ledgers.reminder",
  queue: "finance-sub-ledgers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
