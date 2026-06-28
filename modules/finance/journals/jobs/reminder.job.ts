export const journalsReminderJob = {
  name: "finance/journals.reminder",
  queue: "finance-journals",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
