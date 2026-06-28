export const addressBookReminderJob = {
  name: "master-data/address-book.reminder",
  queue: "master-data-address-book",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
