export const stockLedgerSyncJob = {
  name: "inventory/stock-ledger.sync",
  queue: "inventory-stock-ledger",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
