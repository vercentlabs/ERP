export const customerGroupsReminderJob = {
  name: "commerce/customer-groups.reminder",
  queue: "commerce-customer-groups",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
