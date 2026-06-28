export const taxMasterReminderJob = {
  name: "master-data/tax-master.reminder",
  queue: "master-data-tax-master",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
