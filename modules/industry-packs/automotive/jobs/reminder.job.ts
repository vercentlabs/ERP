export const automotiveReminderJob = {
  name: "industry-packs/automotive.reminder",
  queue: "industry-packs-automotive",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
