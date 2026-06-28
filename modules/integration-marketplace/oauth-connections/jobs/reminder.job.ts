export const oauthConnectionsReminderJob = {
  name: "integration-marketplace/oauth-connections.reminder",
  queue: "integration-marketplace-oauth-connections",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
