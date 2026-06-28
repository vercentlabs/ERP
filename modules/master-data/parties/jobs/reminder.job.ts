export const partiesReminderJob = {
  name: "master-data/parties.reminder",
  queue: "master-data-parties",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
