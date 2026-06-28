export const nonprofitReminderJob = {
  name: "industry-packs/nonprofit.reminder",
  queue: "industry-packs-nonprofit",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
