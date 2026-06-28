export const sdkManagementReminderJob = {
  name: "integration-marketplace/sdk-management.reminder",
  queue: "integration-marketplace-sdk-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
