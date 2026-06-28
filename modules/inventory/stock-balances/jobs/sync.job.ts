export const stockBalancesSyncJob = {
  name: "inventory/stock-balances.sync",
  queue: "inventory-stock-balances",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
