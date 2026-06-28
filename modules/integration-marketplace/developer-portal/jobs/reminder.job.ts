export const developerPortalReminderJob = {
  name: "integration-marketplace/developer-portal.reminder",
  queue: "integration-marketplace-developer-portal",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
