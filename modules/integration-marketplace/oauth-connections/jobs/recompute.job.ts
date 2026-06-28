export const oauthConnectionsRecomputeJob = {
  name: "integration-marketplace/oauth-connections.recompute",
  queue: "integration-marketplace-oauth-connections",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
