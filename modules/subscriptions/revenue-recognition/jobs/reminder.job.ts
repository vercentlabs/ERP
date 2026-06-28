export const revenueRecognitionReminderJob = {
  name: "subscriptions/revenue-recognition.reminder",
  queue: "subscriptions-revenue-recognition",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
