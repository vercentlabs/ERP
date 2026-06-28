export const documentIntelligenceReminderJob = {
  name: "ai/document-intelligence.reminder",
  queue: "ai-document-intelligence",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
