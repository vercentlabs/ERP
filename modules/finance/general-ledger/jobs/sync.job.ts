export const generalLedgerSyncJob = {
  name: "finance/general-ledger.sync",
  queue: "finance-general-ledger",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
