export const constructionReminderJob = {
  name: "industry-packs/construction.reminder",
  queue: "industry-packs-construction",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
