export const stockBalancesReminderJob = {
  name: "inventory/stock-balances.reminder",
  queue: "inventory-stock-balances",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
