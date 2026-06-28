export const deliveryNotesReminderJob = {
  name: "sales/delivery-notes.reminder",
  queue: "sales-delivery-notes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
