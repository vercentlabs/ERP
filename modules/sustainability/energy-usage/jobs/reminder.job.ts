export const energyUsageReminderJob = {
  name: "sustainability/energy-usage.reminder",
  queue: "sustainability-energy-usage",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
