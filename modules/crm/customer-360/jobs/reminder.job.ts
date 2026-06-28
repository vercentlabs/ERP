export const customer360ReminderJob = {
  name: "crm/customer-360.reminder",
  queue: "crm-customer-360",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
