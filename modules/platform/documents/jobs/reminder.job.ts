export const documentsReminderJob = {
  name: "platform/documents.reminder",
  queue: "platform-documents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
