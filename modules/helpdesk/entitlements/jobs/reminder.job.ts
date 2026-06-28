export const entitlementsReminderJob = {
  name: "helpdesk/entitlements.reminder",
  queue: "helpdesk-entitlements",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
