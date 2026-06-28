export const currencyMasterReminderJob = {
  name: "master-data/currency-master.reminder",
  queue: "master-data-currency-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
