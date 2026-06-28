export const stockLedgerRecomputeJob = {
  name: "inventory/stock-ledger.recompute",
  queue: "inventory-stock-ledger",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
