export const rfqsReminderJob = {
  name: "procurement/rfqs.reminder",
  queue: "procurement-rfqs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
