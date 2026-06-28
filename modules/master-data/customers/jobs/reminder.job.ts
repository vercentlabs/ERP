export const customersReminderJob = {
  name: "master-data/customers.reminder",
  queue: "master-data-customers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
