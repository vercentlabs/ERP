export const suppliersReminderJob = {
  name: "procurement/suppliers.reminder",
  queue: "procurement-suppliers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
