export const creditNotesReminderJob = {
  name: "sales/credit-notes.reminder",
  queue: "sales-credit-notes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
