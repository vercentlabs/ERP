export const wholesaleDistributionReminderJob = {
  name: "industry-packs/wholesale-distribution.reminder",
  queue: "industry-packs-wholesale-distribution",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
