export const commissionsReminderJob = {
  name: "sales/commissions.reminder",
  queue: "sales-commissions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
