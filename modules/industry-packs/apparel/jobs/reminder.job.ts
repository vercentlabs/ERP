export const apparelReminderJob = {
  name: "industry-packs/apparel.reminder",
  queue: "industry-packs-apparel",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
