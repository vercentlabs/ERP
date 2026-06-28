export const integrationsRecomputeJob = {
  name: "platform/integrations.recompute",
  queue: "platform-integrations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
