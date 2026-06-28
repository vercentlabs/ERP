export const subLedgersSyncJob = {
  name: "finance/sub-ledgers.sync",
  queue: "finance-sub-ledgers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
