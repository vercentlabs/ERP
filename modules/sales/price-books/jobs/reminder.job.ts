export const priceBooksReminderJob = {
  name: "sales/price-books.reminder",
  queue: "sales-price-books",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
