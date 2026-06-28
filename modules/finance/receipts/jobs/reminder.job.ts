export const receiptsReminderJob = {
  name: "finance/receipts.reminder",
  queue: "finance-receipts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
