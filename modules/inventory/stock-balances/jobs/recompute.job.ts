export const stockBalancesRecomputeJob = {
  name: "inventory/stock-balances.recompute",
  queue: "inventory-stock-balances",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
