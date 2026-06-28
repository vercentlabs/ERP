export const goodsReceiptsReminderJob = {
  name: "procurement/goods-receipts.reminder",
  queue: "procurement-goods-receipts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
