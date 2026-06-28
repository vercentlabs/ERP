export const freightRatesReminderJob = {
  name: "logistics/freight-rates.reminder",
  queue: "logistics-freight-rates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
