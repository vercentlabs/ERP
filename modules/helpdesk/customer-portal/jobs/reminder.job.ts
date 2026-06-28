export const customerPortalReminderJob = {
  name: "helpdesk/customer-portal.reminder",
  queue: "helpdesk-customer-portal",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
