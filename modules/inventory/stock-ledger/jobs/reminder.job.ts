export const stockLedgerReminderJob = {
  name: "inventory/stock-ledger.reminder",
  queue: "inventory-stock-ledger",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
