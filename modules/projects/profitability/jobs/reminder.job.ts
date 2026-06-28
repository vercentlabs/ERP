export const profitabilityReminderJob = {
  name: "projects/profitability.reminder",
  queue: "projects-profitability",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
