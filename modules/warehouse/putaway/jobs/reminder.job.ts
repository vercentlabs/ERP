export const putawayReminderJob = {
  name: "warehouse/putaway.reminder",
  queue: "warehouse-putaway",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
