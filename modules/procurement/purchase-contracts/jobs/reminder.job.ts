export const purchaseContractsReminderJob = {
  name: "procurement/purchase-contracts.reminder",
  queue: "procurement-purchase-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
