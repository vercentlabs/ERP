export const oauthConnectionsSyncJob = {
  name: "integration-marketplace/oauth-connections.sync",
  queue: "integration-marketplace-oauth-connections",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
