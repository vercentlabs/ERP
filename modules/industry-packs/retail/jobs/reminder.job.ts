export const retailReminderJob = {
  name: "industry-packs/retail.reminder",
  queue: "industry-packs-retail",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
