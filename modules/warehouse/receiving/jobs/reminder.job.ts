export const receivingReminderJob = {
  name: "warehouse/receiving.reminder",
  queue: "warehouse-receiving",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
