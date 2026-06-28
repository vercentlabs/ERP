export const suppliersReminderJob = {
  name: "master-data/suppliers.reminder",
  queue: "master-data-suppliers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
