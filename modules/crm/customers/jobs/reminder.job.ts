export const customersReminderJob = {
  name: "crm/customers.reminder",
  queue: "crm-customers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
