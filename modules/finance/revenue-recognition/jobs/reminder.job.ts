export const revenueRecognitionReminderJob = {
  name: "finance/revenue-recognition.reminder",
  queue: "finance-revenue-recognition",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
